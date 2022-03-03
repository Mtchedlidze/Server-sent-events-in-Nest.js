import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom, map } from 'rxjs'
import { IPriceData } from './interface/IPriceData'

@Injectable()
export class CryptoService {
  apiUrl: string
  constructor(private readonly httpService: HttpService) {
    this.apiUrl = process.env.API_URL
  }

  async handleIncommintData(): Promise<IPriceData[]> {
    const data = await lastValueFrom(
      this.httpService
        .get(this.apiUrl, {
          params: {
            limit: 5,
          },
        })
        .pipe(map((resp) => resp.data)),
    )

    return data.data.map(this.filterData.bind(this))
  }

  private filterData(data: IPriceData): IPriceData {
    const { id, priceUsd, name, rank, symbol } = data
    return { id, priceUsd, name, rank, symbol }
  }
}
