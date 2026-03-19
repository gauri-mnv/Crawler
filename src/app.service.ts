import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

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

      // 3. Return everything with counts
      return {
        url: url,
        stats: {
          totalHeadlines: headlines.length,
          totalLinksFound: links.length,
        },
        headlines: headlines,
        nextPageOptions: links, // These are your "Next Page" paths
      };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { message: 'Failed to crawl', error: error };
    }
  }
}

// 1. Collect Headlines (H2 tags)
// 2. Collect Anchor Tags (Links)
// 3. Return everything with counts
