import axios from "axios";
import TurndownService from "turndown";
import fs from "fs";
import * as url from "url";
import path from 'path';
import { JSDOM } from "jsdom";
import { addToVectorStore } from "../utils/vector-store.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Fetch all document links from a given URL
async function fetchAllDocsLink(url, linkSelector) {
  const { data: html } = await axios.get(url);
  const { document } = new JSDOM(html).window;
  const links = Array.from(document.querySelectorAll(linkSelector))
    .map((element) => new URL(element.getAttribute('href'), url).href);
  return links;
}

// Convert HTML content from a given URL to Markdown
async function convertHtmlToMarkdown(url, targetElement = 'main') {
  const response = await axios.get(url);
  const html = response.data;
  const { document } = new JSDOM(html).window;
  const mainElement = document.querySelector(targetElement);
  const turndownService = new TurndownService();
  return turndownService.turndown(mainElement.innerHTML);
}

// Write content to a file
async function writeToFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

// Remove a file
function removeFile(filePath) {
  fs.unlinkSync(filePath);
}

// Main handler function for crawling
export async function handleCrawl(ctx) {
  const { url: targetUrl, parseLinks, linkSelector, targetElement, namespace } = ctx.request.body;
  const filePath = path.resolve(__dirname, `../source/temp-crawl-document.md`);

  let markdown = "";
  if (parseLinks === 'true') {
    const docsLinks = await fetchAllDocsLink(targetUrl, linkSelector);
    for (const link of docsLinks) {
      markdown += await convertHtmlToMarkdown(link, targetElement) + "\r\n";
    }
  } else {
    markdown = await convertHtmlToMarkdown(targetUrl, targetElement);
  }

  try {
    writeToFile(filePath, markdown);
    await addToVectorStore(filePath, namespace);
    removeFile(filePath);
    ctx.status = 200;
    ctx.body = { message: 'Successfully crawled and added to vector store' };
  } catch (error) {
    console.error(`Error:`, error);
    ctx.status = 500;
    ctx.body = { error: 'Error occurred' };
  }
}
