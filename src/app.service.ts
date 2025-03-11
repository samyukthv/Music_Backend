import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/devConfigService';

@Injectable()
export class AppService {
  constructor(private devConfigService: DevConfigService) {}

  getHello(): string {
    return `lets study nest.js ${this.devConfigService.getDBHOST()}`;
  }
}
