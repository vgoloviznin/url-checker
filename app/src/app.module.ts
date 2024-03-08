import { Module } from '@nestjs/common';
import { UrlModule } from './modules/url/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './models/url.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      database: 'postgres',
      password: 'postgres',
      username: 'postgres',
      entities: [UrlEntity],
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
