import { Controller, Sse } from '@nestjs/common'
import { interval, map, Observable } from 'rxjs'
import { CryptoService } from './crypto.service'

@Controller()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Sse('crypto-prices')
  async sse(): Promise<Observable<unknown>> {
    const data = await this.cryptoService.handleIncommintData()
    return interval(45000).pipe(map(() => ({ data })))
  }
}
