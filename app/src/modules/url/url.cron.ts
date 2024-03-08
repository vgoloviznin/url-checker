import { Injectable } from '@nestjs/common';
import { URLService } from './url.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UrlCron {
  constructor(private readonly urlService: URLService) {}

  @Cron('0 */2 * * * *')
  async updateUrls() {
    await this.urlService.updateUrls();
  }
}
