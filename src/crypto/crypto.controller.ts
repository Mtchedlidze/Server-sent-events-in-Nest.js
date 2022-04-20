import { Controller, Sse } from '@nestjs/common'
import { timer, lastValueFrom, Observable, switchMap } from 'rxjs'
import { CryptoService } from './crypto.service'
import { IData } from './interface/IData'

@Controller()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Sse('crypto-prices')
  SendData(): Observable<IData> {
    return timer(0, 60000).pipe(
      switchMap(async () => {
        const data = await lastValueFrom(
          this.cryptoService.handleIncommintData()
        )
        return { data }
      }),
    )
  }
}
