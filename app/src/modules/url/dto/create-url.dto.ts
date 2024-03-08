import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrl {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl({
    require_host: true,
    require_protocol: true,
  })
  url: string;
}
