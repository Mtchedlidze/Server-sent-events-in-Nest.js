import { Module } from '@nestjs/common'
import { CryptoService } from './crypto.service'
import { CryptoController } from './crypto.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}
