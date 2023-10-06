import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'delivery 테스트 3';
  }

  getPortNumber(): string | undefined {
    return this.configService.get('PORT');
  }
}
