import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BitcoinService } from "../bitcoin.service";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-minha-carteira",
  templateUrl: "./minha-carteira.component.html",
  styleUrls: ["./minha-carteira.component.css"]
})
export class MinhaCarteiraComponent implements OnInit {
  totalBitcoin: number = 0;
  totalReal: number = 0;
  listRef: AngularFireList<any>;
  list: Observable<any[]>;
  constructor(
    public bitcoinService: BitcoinService,
    private db: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.listRef = db.list("carteira");
    this.list = this.listRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  ngOnInit() {
    this.bitcoinService.start();
  }

  add(value: string) {
    if (value != "") {
      this.totalBitcoin += parseInt(value);
      this.totalReal =
        this.totalBitcoin * this.bitcoinService.currentPrice.bpi.BRL.rate_float;
      this.listRef.push({
        saldo: this.totalBitcoin,
        cotacao: this.bitcoinService.currentPrice.bpi.BRL.rate_float,
        valor: "+" + value,
        tipo: "+",
        user: this.authService.currentUserEmail
      });
    }
  }

  remove(value: string) {
    if (value != "") {
      if (this.totalBitcoin - parseInt(value) >= 0) {
        this.totalBitcoin -= parseInt(value);
        this.totalReal =
          this.totalBitcoin *
          this.bitcoinService.currentPrice.bpi.BRL.rate_float;
      } else {
        this.totalBitcoin = 0;
        this.totalReal = 0;
      }
      this.listRef.push({
        saldo: this.totalBitcoin,
        cotacao: this.bitcoinService.currentPrice.bpi.BRL.rate_float,
        valor: "-" + value,
        tipo: "-",
        user: this.authService.currentUserEmail
      });
    }
  }
}
