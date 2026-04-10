/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
// import axios from 'axios';

@Controller('scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. GET Method: Jab aap pehli baar page kholenge (localhost:4005/scrape/Headlines)
  @Get('Headlines')
  // @Render('index') // index.ejs file ko render karega
  getForm() {
    // Shuruat mein hamare paas koi data nahi hai, isliye empty objects bhej rahe hain
    return {
      headlines: [],
      nextPageOptions: [],
      paragraphs: [],
      stats: { totalHeadlines: 0, totalLinksFound: 0, totalParagraphs: 0 },
    };
  }
  // 2. POST Method: Jab aap 'Scrape Now' button dabayenge
  @Post('Headlines')
  // @Render('index')
  async postForm(@Body('target') target: string) {
    // @Body('target') wahi naam hai jo aapne HTML input ke 'name' attribute mein diya hai
    if (!target || !target.startsWith('http')) {
      return {
        url: target,
        headlines: [],
        nextPageOptions: [],
        paragraphs: [],
        stats: { totalHeadlines: 0, totalLinksFound: 0, totalParagraphs: 0 },
        errorMessage: 'Invalid URL! Please include http:// or https://',
      };
    }

    const data = await this.appService.getTitle(target);
    return data;
  }

  // @Get('proxy-api')
  // async proxyApi(@Query('url') apiUrl: string) {
  //   const response = await axios.get(apiUrl);
  //   return response.data;
  // }

  // @Get('proxy-api')
  // async proxyApi(@Query('url') apiUrl: string) {
  //   try {
  //     const response = await axios.get(apiUrl);
  //     // Backend data fetch karke wapas Next.js ko dega
  //     return response.data;
  //   } catch (e) {
  //     return {
  //       statusCode: 500,
  //       message: 'Failed to fetch from external API',
  //       error: e,
  //     };
  //   }
  // }

  // @All('proxy-api')
  // async dynamicProxy(
  //   @Query('url') apiUrl: string,
  //   @Query('method') method: string = 'GET',
  //   @Body() body: any,
  // ) {
  //   try {
  //     const response = await axios({
  //       method: method,
  //       url: apiUrl,
  //       data: body,
  //       headers: {
  //         Accept: 'application/json, text/plain, */*',
  //         'Content-Type': 'application/json',
  //         // 🛡️ Sabse important: Axios ka naam hata kar Chrome ka naam daalna hai
  //         'User-Agent':
  //           'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  //         // Kuch APIs origin check karti hain
  //         Origin: 'https://medianvdemo.com',
  //         Referer: 'https://medianvdemo.com/',
  //       },
  //     });
  //     return response.data;
  //   } catch (e) {
  //     // Agar external server 500 deta hai, toh hum uska actual response data yahan dekh sakte hain
  //     const errorData = e;
  //     return {
  //       error: 'Proxy failed',
  //       message: errorData,
  //       status: e,
  //     };
  //   }
  // }
}
