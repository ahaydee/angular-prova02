import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { BitcoinComponent } from "./bitcoin/bitcoin.component";
import { MinhaCarteiraComponent } from "./minha-carteira/minha-carteira.component";
import { BitcoinService } from "./bitcoin.service";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "bitcoin", component: BitcoinComponent },
      { path: "minhacarteira", component: MinhaCarteiraComponent }
    ]),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB7Yph7MYwjfoXt4RMLYXqMpqYArzew9GE",
      authDomain: "prova02-1383e.firebaseapp.com",
      databaseURL: "https://prova02-1383e.firebaseio.com",
      projectId: "prova02-1383e",
      storageBucket: "prova02-1383e.appspot.com",
      messagingSenderId: "272725565258",
      appId: "1:272725565258:web:56729b9f2eac8704932bb3"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    BitcoinComponent,
    MinhaCarteiraComponent
  ],
  bootstrap: [AppComponent],
  providers: [BitcoinService, AuthService]
})
export class AppModule {}
