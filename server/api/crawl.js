import axios from "axios";
import TurndownService from "turndown";
import fs from "fs";
import * as url from "url";
import path from 'path';
import { JSDOM } from "jsdom";
import { addToVectorStore } from "../utils/vector-store.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

async function fetchAllDocsLink(ctx) {
  try {
    const url = ctx.request.body.url;
    const linkSelector = ctx.request.body.linkSelector;

    const response = await axios.get(url);
    const html = response.data;

    const { document } = new JSDOM(html).window;
    const links = Array.from(document.querySelectorAll(linkSelector))
      .map((element) => new URL(element.getAttribute('href'), url).href);

    return links;
  } catch (error) {
    console.error(`Error fetching all document links from ${url}:`, error);
    return [];
  }
}

async function convertDocsToMarkdown(ctx) {
  try {
    const link = ctx.request.body.url;
    const targetElement = ctx.request.body.targetElement || 'main';

    const response = await axios.get(link);
    const html = response.data;

    const { document } = new JSDOM(html).window;

    const mainElement = document.querySelector(targetElement);
    const turndownService = new TurndownService();
    return turndownService.turndown(mainElement.innerHTML);
  } catch (error) {
    console.error(`Error converting document at ${link} to Markdown:`, error);
    return '';
  }
}

export async function handleCrawl(ctx) {
  const targetUrl = ctx.request.body.url;
  const parseLinks = ctx.request.body.parseLinks;

  let markdown = "";
  if (parseLinks) {
    const docsLinks = await fetchAllDocsLink(targetUrl);
    for (const link of docsLinks) {
      markdown += await convertDocsToMarkdown(ctx) + "\r\n";
    }
  } else {
    markdown = await convertDocsToMarkdown(ctx);
  }

  try {
    fs.writeFileSync(path.resolve(__dirname, `../source/temp-crawl-document.md`), markdown)
  } catch (error) {
    console.error(`Error writing to file:`, error);
    ctx.status = 500;
    ctx.body = { error: 'Error writing to file' };
    return;
  }

  try {
    await addToVectorStore(path.resolve(__dirname, `../source/temp-crawl-document.md`), 'default');
  } catch (error) {
    console.error(`Error adding to vector store:`, error);
    ctx.status = 500;
    ctx.body = { error: 'Error adding to vector store' };
    return;
  }

  ctx.status = 200;
  ctx.body = { message: 'Successfully crawled and added to vector store' };
}
