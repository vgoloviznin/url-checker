import { Injectable } from '@nestjs/common';
import { CreateUrl } from './dto/create-url.dto';
import { LessThan, Repository } from 'typeorm';
import { UrlEntity } from '../../models/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

@Injectable()
export class URLService {
  constructor(
    @InjectRepository(UrlEntity) private readonly repo: Repository<UrlEntity>,
  ) {}

  getList(): Promise<UrlEntity[]> {
    return this.repo.find();
  }

  private cleanUrl(url: string): string {
    let clean = url.trim();
    if (clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }

    return clean;
  }

  async createUrl(args: CreateUrl): Promise<void> {
    const url = this.cleanUrl(args.url);
    const isActive = await this.checkUrlActive(url);

    const newUrl = this.repo.create({
      url,
      isActive,
    });

    await this.repo.save(newUrl);
  }

  async checkUrlActive(url: string): Promise<boolean> {
    try {
      await axios.head(url);

      return true;
    } catch (e) {
      return false;
    }
  }

  async removeUrl(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async updateUrls(): Promise<void> {
    const updateTime = 2 * 60 * 1000;
    const toUpdate = await this.repo.find({
      where: {
        updatedAt: LessThan(new Date(Date.now() - updateTime)),
      },
      select: {
        id: true,
        url: true,
      },
    });

    const proms = toUpdate.map(async (url) => {
      const isActive = await this.checkUrlActive(url.url);

      await this.repo.update(url.id, { isActive });
    });

    await Promise.all(proms);
  }
}
