import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { currenciesArray } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currencies = currenciesArray;
  amount: string = '1';
  fromCurrency: string = 'USD';
  toCurrency: string = 'XAF';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  title = 'currency-converter';

  takeAmount(event: any) {
    this.amount = event.target.value;
  }

  setFromCurency(event: any) {
    const index = event.target.selectedIndex;
    const { id }: { id: string } = event.target[index];
    this.fromCurrency = id;
    console.log(this.fromCurrency);
  }

  setToCurency(event: any) {
    const index = event.target.selectedIndex;
    const { id }: { id: string } = event.target[index];
    this.toCurrency = id;
  }
}
