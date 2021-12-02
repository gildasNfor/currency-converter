import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { responseObject } from './utils';

@Pipe({ name: 'currencyConverter', pure: false })
export class CurrencyConverter implements PipeTransform {
  convertedCurrency: string = '';
  latestAmount!: string;
  latestfromCurrency!: string;
  latesttoCurrecy!: string;
  constructor(private http: HttpClient) {}

  transform(amount: string, fromCurrency: string, toCurrency: string): string {
    if (
      this.latestAmount == amount &&
      this.latestfromCurrency == fromCurrency &&
      this.latesttoCurrecy == toCurrency
    ) {
      return this.convertedCurrency;
    }
    this.latestAmount = amount;
    this.latestfromCurrency = fromCurrency;
    this.latesttoCurrecy = toCurrency;

    this.http
      .get<responseObject>(
        `https://freecurrencyapi.net/api/v2/latest?apikey=1a6be6d0-52a3-11ec-9ae6-f349a90e0a36&base_currency=${fromCurrency}`
      )
      .subscribe((res: any) => {
        try {
          const cash = parseInt(amount);
          if (cash) {
            this.convertedCurrency = (cash * res.data[toCurrency]).toString();
          } else this.convertedCurrency = '';
          console.log(this.convertedCurrency);
        } catch (error) {
          this.convertedCurrency = '';
          console.log(this.convertedCurrency);
        }
      });
    return this.convertedCurrency;
  }
}
