import { Controller, Sse } from '@nestjs/common'
import { interval, map, Observable } from 'rxjs'
import { CryptoService } from './crypto.service'

@Controller()
export class CryptoController {
  names: [string, string?]
  constructor(private readonly cryptoService: CryptoService) {}

  @Sse('sse')
  async sse(): Promise<Observable<unknown>> {
    const data = await this.cryptoService.handleIncommintData()
    return interval(6000).pipe(map(() => ({ data })))
  }
}
