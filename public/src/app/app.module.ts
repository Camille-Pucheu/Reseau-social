import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

/********* Components *********/
import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConnectionInscriptionComponent } from './connection-inscription/connection-inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RechercheComponent } from './recherche/recherche.component';
import { MessagesComponent } from './messages/messages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
/********* Services *********/
import { AuthentificationService } from './services/authentification.service';
import { AuthGuard } from './services/auth.guard.service';


@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    HeaderComponent,
    NavbarComponent,
    ConnectionInscriptionComponent,
    AccueilComponent,
    RechercheComponent,
    MessagesComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthentificationService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
