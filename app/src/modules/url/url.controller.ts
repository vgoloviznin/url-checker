import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { URLService } from './url.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUrl } from './dto/create-url.dto';

@Controller('/url')
export class UrlController {
  constructor(private readonly urlService: URLService) {}

  @ApiOperation({
    summary: 'Get a list of URLs',
  })
  @Get('/')
  getList() {
    return this.urlService.getList();
  }

  @ApiOperation({
    summary: 'Add a new URL',
  })
  @Post('/')
  async createUrl(@Body() body: CreateUrl) {
    await this.urlService.createUrl(body);
  }

  @ApiOperation({
    summary: 'Removes URL by ID',
  })
  @Delete('/:id')
  async removeUrl(@Param('id', ParseIntPipe) id: number) {
    await this.urlService.removeUrl(id);
  }
}
