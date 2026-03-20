import axios from 'axios';
import * as cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';
import chalker from 'chalker';

@Injectable()
export class AppService {
  async getTitle(url: string) {
    try {
      const response = await axios.get(url);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const html = response.data;
      const $ = cheerio.load(html);

      const headlines: string[] = [];
      const links: string[] = [];

      console.log(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chalker(`<blue.bold>🔍 Scraping:</blue.bold> <gray>${url}</gray>`),
      );
      // 1. Collect Headlines (H2 tags)
      $('h2').each((index, element) => {
        const text = $(element).text().trim();
        if (text) headlines.push(text);
      });

      // 2. Collect Anchor Tags (Links)
      $('a').each((index, element) => {
        const link = $(element).attr('href');
        if (link && link.startsWith('http')) {
          links.push(link);
        }
      });

      console.log(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chalker(`
              <bgGreen.black.bold>  SUCCESS  </bgGreen.black.bold> <green>Fetched: ${url}</green>
              <cyan>┌──────────────────────────────────┐</cyan>
              <cyan>│</cyan> <yellow.bold>Headlines Found:</yellow.bold>  <white>${headlines.length.toString().padEnd(15)}</white> <cyan>│</cyan>
              <cyan>│</cyan> <magenta.bold>Links Found:</magenta.bold>      <white>${links.length.toString().padEnd(15)}</white> <cyan>│</cyan>
              <cyan>└──────────────────────────────────┘</cyan>
              `),
      );

      // 3. Return everything with counts
      return {
        url: url,
        stats: {
          totalHeadlines: headlines.length,
          totalLinksFound: links.length,
        },
        headlines: headlines,
        nextPageOptions: links,
      };
    } catch (error) {
      console.error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chalker(`
        <bgRed.white.bold>  ERROR  </bgRed.white.bold> <red>Failed to crawl:</red> <gray>${url}</gray>
        <red.italic>Reason: ${error}</red.italic>
              `),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { message: 'Failed to crawl', error: error };
    }
  }
}

// 1. Collect Headlines (H2 tags)
// 2. Collect Anchor Tags (Links)
// 3. Return everything with counts
