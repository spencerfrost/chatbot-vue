import axios from "axios";
import TurndownService from "turndown";
import fs from "fs";
import * as url from "url";
import path from 'path';
import { JSDOM } from "jsdom";
import { addToVectorStore, addDocumentsToVectorStore } from "../utils/vector-store.js";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

import { ApifyDatasetLoader } from "langchain/document_loaders/web/apify_dataset";
import { Document } from "langchain/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Fetch all document links from a given URL
async function fetchAllDocsLink(url, linkSelector) {
  console.log('Fetching all document links')
  try {
    const { data: html } = await axios.get(url);
    console.log('html fetched')
    const { document } = new JSDOM(html).window;
    const links = Array.from(document.querySelectorAll(linkSelector))
      .map((element) => new URL(element.getAttribute('href'), url).href);

    return links;
  } catch (error) {
    // console.error(`Error:`, error);
    return [];
  }
}

// Convert HTML content from a given URL to Markdown
async function convertHtmlToMarkdown(url, targetElement) {
  console.log('Converting HTML to Markdown');
  console.log('targetElement', targetElement);
  try {
    const { data: html } = await axios(url);
    const { document } = new JSDOM(html).window;
    const mainElement = document.querySelector(targetElement);
    const turndownService = new TurndownService();

    return turndownService.turndown(mainElement.innerHTML);
  } catch (error) {
    console.error(`Error converting html to markdown:`, error);
  }
}

async function fetchDocsToMarkdown(link) {
  const loader = new CheerioWebBaseLoader(link);
  
  const docs = await loader.load();
  console.log('docs', docs);
  // var turndownService = new TurndownService();
  // return turndownService.turndown($("main").html());
}

async function getPageWithPuppeteer(url) {
  const loader = new PuppeteerWebBaseLoader(url);
  const docs = await loader.load();

  console.log(docs);
  return docs;
}

async function writeToFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function removeFile(filePath) {
  fs.unlinkSync(filePath);
}

// Main handler function for crawling
export async function handleCrawl(ctx) {
  console.log('Handling crawl request...')
  const { url: targetUrl, linkSelector, targetElement } = ctx.request.body;
  // const filePath = path.resolve(__dirname, `../source/temp-crawl-document.md`);

  // let markdown = "";
  // if (linkSelector.length > 0) {
  //   const docsLinks = await fetchAllDocsLink(targetUrl, linkSelector);

  //   for (const link of docsLinks) {
  //     markdown += await convertHtmlToMarkdown(link, targetElement) + "\r\n";
  //   }
  // } else {
  //   // markdown = await fetchDocsToMarkdown(targetUrl);
  //   markdown = await convertHtmlToMarkdown(targetUrl, targetElement);
  //   console.log('markdown', markdown);
  // }

  const loader = await ApifyDatasetLoader.fromActorCall(
    "apify/website-content-crawler",
    {
      startUrls: [{ url: targetUrl }],
      excludeUrlGlobs: [
        {
            "glob": "https://eventconnect.zendesk.com/hc/en-us/sections/*"
        },
        {
            "glob": "https://eventconnect.zendesk.com/hc/en-us/requests/*"
        },
        {
            "glob": "https://eventconnect.zendesk.com/hc/en-us/signin/*"
        }
    ],
    },
    {
      datasetMappingFunction: (item) =>
        new Document({
          pageContent: (item.text || ""),
          metadata: { source: item.url },
        }),
      clientOptions: {
        token: process.env.APIFY_API_TOKEN
      },
    }
  );
  
  const docs = await loader.load();

  try {
    await addDocumentsToVectorStore(docs);
    // writeToFile(filePath, markdown);
    // await addToVectorStore(filePath);
    // removeFile(filePath);
    ctx.status = 200;
    ctx.body = { message: 'Successfully crawled and added to vector store' };
  } catch (error) {
    console.error(`Error:`, error);
    console.error('Error occurred while crawling and adding to vector store');
    ctx.status = 500;
    ctx.body = { error };
  }
}
