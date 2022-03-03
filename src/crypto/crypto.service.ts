import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { map, Observable } from 'rxjs'
import { IPriceData } from './interface/IPriceData'

@Injectable()
export class CryptoService {
  apiUrl: string
  constructor(private readonly httpService: HttpService) {
    this.apiUrl = process.env.API_URL
  }

  handleIncommintData(): Observable<IPriceData[]> {
    return this.httpService
      .get(this.apiUrl, {
        params: {
          limit: 5,
        },
      })
      .pipe(map(({ data: { data } }) => data.map(this.filterData.bind(this))))
  }

  private filterData(data: IPriceData): IPriceData {
    const { id, priceUsd, name, rank, symbol } = data
    return { id, priceUsd, name, rank, symbol }
  }
}
