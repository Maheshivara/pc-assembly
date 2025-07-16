import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';

@Module({
  imports: [AuthModule, UserModule, ConfigurationModule],
})
export class AppModule {}
