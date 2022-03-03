import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CryptoModule } from './crypto/crypto.module'
@Module({
  imports: [CryptoModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule {}
