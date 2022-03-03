import { Module } from '@nestjs/common'

import { CryptoModule } from './crypto/crypto.module'
@Module({
  imports: [CryptoModule],
  providers: [],
})
export class AppModule {}
