import { Component, VERSION } from "@angular/core";
import { AuthService } from "./auth.service";
import { BitcoinService } from "./bitcoin.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Prova 02";
  firstPrice: number;
  updateList;
  currentPrice;
  email: string;
  password: string;

  constructor(
    public bitcoinService: BitcoinService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.bitcoinService.start();
  }

  getUpdateList() {
    if (this.bitcoinService.updateList.length > 0) {
      this.firstPrice = this.bitcoinService.updateList[0].BRL;
    }
    this.updateList = this.bitcoinService.updateList;
    return this.bitcoinService.updateList;
  }

  getCurrentPrice() {
    if (this.bitcoinService.currentPrice)
      this.currentPrice = this.bitcoinService.currentPrice.bpi.BRL.rate_float;
    return this.bitcoinService.currentPrice;
  }

  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password);
    this.email = this.password = "";
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }
}
