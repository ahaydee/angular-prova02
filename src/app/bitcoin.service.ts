import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface Response {
  time: {
    updated: string;
  };
  bpi: {
    [key in "BRL"]: {
      rate_float: number;
    }
  };
}

interface PriceUpdate {
  timestamp: Date;
  BRL: number;
}

@Injectable()
export class BitcoinService {
  private timer: any;
  currentPrice: Response;
  updateList: Array<PriceUpdate> = [];
  constructor(private http: HttpClient) {}

  start() {
    if (!this.timer) {
      this.update();
      this.timer = setInterval(() => {
        this.update();
      }, 60000);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  update() {
    this.http
      .get<Response>("https://api.coindesk.com/v1/bpi/currentprice/BRL.json")
      .subscribe(data => {
        this.currentPrice = data;
        this.updateList.push({
          timestamp: new Date(),
          BRL: this.currentPrice.bpi.BRL.rate_float
        });
      });
  }
}
