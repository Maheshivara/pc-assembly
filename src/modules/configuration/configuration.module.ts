import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigurationController } from './configuration.controller';

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
  imports: [PrismaModule],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
