import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private apiKey = '41ca878c9029535553a37a61';
  private baseUrl = 'https://v6.exchangerate-api.com/v6';

  constructor(private http: HttpClient) {}

  getRates(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.apiKey}/latest/${baseCurrency}`);
  }

  getSupportedCurrencies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.apiKey}/codes`);
  }
}