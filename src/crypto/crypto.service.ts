import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom, map } from 'rxjs'
import { IPriceData } from './interface/IPriceData'

@Injectable()
export class CryptoService {
  constructor(private readonly httpService: HttpService) {}

  async handleIncommintData(): Promise<IPriceData[]> {
    const data = await lastValueFrom(
      this.httpService
        .get('https://api.coincap.io/v2/assets?limit=5')
        .pipe(map((resp) => resp.data)),
    )

    return data.data.map(this.filterData.bind(this))
  }

  filterData(data: IPriceData): IPriceData {
    const { id, priceUsd, name, rank, symbol } = data
    return { id, priceUsd, name, rank, symbol }
  }
}
