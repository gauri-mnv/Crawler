/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import chalker from 'chalker';
import UserAgent from 'user-agents';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getTitle(url: string) {
    const userAgent = new UserAgent();
    // Puppeteer launch karein
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process',
        '--no-zygote',
      ],
    });

    try {
      const page = await browser.newPage();

      // User Agent set karein
      await page.setUserAgent(userAgent.toString());

      const apiCalls: string[] = [];
      const headlines: string[] = [];
      const links: string[] = [];
      const paragraphs: string[] = [];

      // 🔍 Network Interception: API calls capture karne ke liye
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const resourceType = request.resourceType();
        // Sirf Fetch aur XHR calls ko list mein dalein
        if (resourceType === 'fetch' || resourceType === 'xhr') {
          apiCalls.push(request.url());
        }
        request.continue();
      });

      console.log(
        chalker(
          `<blue.bold>🔍 Scraping with Puppeteer:</blue.bold> <gray>${url}</gray>`,
        ),
      );

      const apiResponses = {};

      // 2. Network responses ko track karein
      page.on('response', async (response) => {
        const request = response.request();
        if (['fetch', 'xhr'].includes(request.resourceType())) {
          try {
            const url = request.url();
            const data = await response.json();
            apiResponses[url] = data;
          } catch (e) {
            console.log(e);
            return e;
          }
        }
      });
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

      // 1. Collect Headlines (H1, H2, H3)
      const extractedHeadlines = await page.$$eval(
        'h1, h2, h3, h4',
        (elements) =>
          elements.map((el) => el.textContent?.trim()).filter(Boolean),
      );
      headlines.push(...extractedHeadlines);

      // 2. Collect Anchor Tags (Links)
      const extractedLinks = await page.$$eval('a', (elements) =>
        elements
          .map((el) => el.href)
          .filter((href) => href && href.startsWith('http')),
      );
      links.push(...extractedLinks);

      // 3. Collect Paragraphs
      const extractedParagraphs = await page.$$eval('p', (elements) =>
        elements
          .map((el) => el.textContent?.trim())
          .filter((t) => t && t.length > 0),
      );
      paragraphs.push(...extractedParagraphs);

      console.log(
        chalker(`
              <bgGreen.black.bold>  SUCCESS  </bgGreen.black.bold> <green>Fetched: ${url}</green>
              <cyan>┌──────────────────────────────────┐</cyan>
              <cyan>│</cyan> <yellow.bold>Headlines Found:</yellow.bold>  <white>${headlines.length.toString().padEnd(15)}</white> <cyan>│</cyan>
              <cyan>│</cyan> <magenta.bold>Links Found:</magenta.bold>      <white>${links.length.toString().padEnd(15)}</white> <cyan>│</cyan>
              <cyan>│</cyan> <blue.bold>API Calls:</blue.bold>       <white>${apiCalls.length.toString().padEnd(15)}</white> <cyan>│</cyan>
              <cyan>└──────────────────────────────────┘</cyan>
              `),
      );

      await browser.close();
      // console.log(`data: url: ${url},
      //   stats: {
      //     totalHeadlines:${headlines.length} ,
      //     totalLinksFound: ${links.length},
      //     totalParagraphs: ${paragraphs.length},
      //     totalApiCalls: ${apiCalls.length},
      //   },
      //   headlines: ${headlines},
      //   nextPageOptions: ${links},
      //   paragraphs: ${paragraphs},
      //   apiCalls: ${apiCalls}`);

      return {
        url: url,
        stats: {
          totalHeadlines: headlines.length,
          totalLinksFound: links.length,
          totalParagraphs: paragraphs.length,
          totalApiCalls: apiCalls.length,
        },
        headlines: headlines,
        nextPageOptions: links,
        paragraphs: paragraphs,
        apiCalls: apiCalls,
        savedResponses: apiResponses,
      };
    } catch (error) {
      await browser.close();
      console.error(
        chalker(`
        <bgRed.white.bold>  ERROR  </bgRed.white.bold> <red>Failed to crawl:</red> <gray>${url}</gray>
        <red.italic>Reason: ${error}</red.italic>
              `),
      );
      return {
        message: 'Failed to crawl',
        error: error,
        headlines: [],
        nextPageOptions: [],
        paragraphs: [],
        apiCalls: [],
        stats: {
          totalHeadlines: 0,
          totalLinksFound: 0,
          totalParagraphs: 0,
          totalApiCalls: 0,
        },
      };
    }
  }
}
