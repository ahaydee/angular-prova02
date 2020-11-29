import { Component, OnInit } from "@angular/core";
import { BitcoinService } from "../bitcoin.service";

@Component({
  selector: "app-bitcoin",
  templateUrl: "./bitcoin.component.html",
  styleUrls: ["./bitcoin.component.css"]
})
export class BitcoinComponent implements OnInit {
  constructor(public bitcoinService: BitcoinService) {}

  ngOnInit() {
    this.bitcoinService.start();
  }

  getCurrentPrice() {
    return this.bitcoinService.currentPrice;
  }
}
