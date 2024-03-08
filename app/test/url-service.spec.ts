import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { URLService } from '../src/modules/url/url.service';
import { UrlEntity } from '../src/models/url.entity';
import { CreateUrl } from 'src/modules/url/dto/create-url.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Url Service Test', () => {
  let service: URLService;
  let repo: Repository<UrlEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        URLService,
        {
          provide: getRepositoryToken(UrlEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<URLService>(URLService);
    repo = module.get<Repository<UrlEntity>>(getRepositoryToken(UrlEntity));
  });

  describe('- checkUrlActive test', () => {
    it('returns success for succesfull url', async () => {
      const testUrl = 'test';

      mockedAxios.head.mockImplementation(() =>
        Promise.resolve({ status: 200 }),
      );

      const result = await service.checkUrlActive(testUrl);

      expect(mockedAxios.head).toHaveBeenCalledWith(testUrl);
      expect(result).toBe(true);
    });

    it('returns false for invalid url', async () => {
      const testUrl = 'test';

      mockedAxios.head.mockImplementation(() =>
        Promise.reject({ status: 404 }),
      );

      const result = await service.checkUrlActive(testUrl);

      expect(mockedAxios.head).toHaveBeenCalledWith(testUrl);
      expect(result).toBe(false);
    });
  });

  describe('- createUrl test', () => {
    it('- checks active url', async () => {
      const data: CreateUrl = { url: 'test' };
      repo.save = jest.fn();
      repo.create = jest.fn();
      jest.spyOn(service, 'checkUrlActive');

      await service.createUrl(data);

      expect(service.checkUrlActive).toHaveBeenCalled();
      expect(service.checkUrlActive).toHaveBeenCalledWith(data.url);
    });

    it('- saves url', async () => {
      const data: CreateUrl = { url: 'test' };
      const isActive = true;
      repo.save = jest.fn();
      repo.create = jest.fn();
      service.checkUrlActive = jest.fn(() => Promise.resolve(isActive));

      await service.createUrl(data);

      expect(repo.create).toHaveBeenCalled();
      expect(repo.create).toHaveBeenCalledWith({ url: data.url, isActive });
    });
  });
});
