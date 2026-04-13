/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. GET Method:
  @Get('Headlines')
  getForm() {
    try {
      return {
        headlines: [],
        nextPageOptions: [],
        paragraphs: [],
        stats: { totalHeadlines: 0, totalLinksFound: 0, totalParagraphs: 0 },
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // 2. POST Method
  @Post('addHeadlines')
  // async postForm(@Body('target') target: string) {
  async postForm(@Body() body: { target: string }) {
    try {
      // @Body('target') wahi naam hai jo aapne HTML input ke 'name' attribute mein diya hai
      // if (!target || !target.startsWith('http')) {
      //   return {
      //     url: target,
      //     headlines: [],
      //     nextPageOptions: [],
      //     paragraphs: [],
      //     stats: { totalHeadlines: 0, totalLinksFound: 0, totalParagraphs: 0 },
      //     errorMessage: 'Invalid URL! Please include http:// or https://',
      //   };
      // }

      // const data = await this.appService.getTitle(target);
      // return data;

      const result = await this.appService.getTitle(body.target);
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
