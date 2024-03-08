import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { URLService } from './url.service';
import { UrlEntity } from 'src/models/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlCron } from './url.cron';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  controllers: [UrlController],
  providers: [URLService, UrlCron],
})
export class UrlModule {}
