import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

/********* Components *********/
import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ConnectionComponent } from './components/identification/connection/connection.component';
import { HeaderComponent } from './components/header/header.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { InscriptionComponent } from './components/identification/inscription/inscription.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RechercheComponent } from './components/recherche/recherche.component';
/********* Services *********/
import { AuthentificationService } from './services/authentification.service';
import { AuthGuard } from './services/auth.guard.service';
import { PostService } from './services/post.service';
import { ProfilService } from './services/profil.service';



@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConnectionComponent,
    HeaderComponent,
    IdentificationComponent,
    InscriptionComponent,
    MessagesComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PostsComponent,
    ProfilComponent,
    RechercheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthentificationService,
    AuthGuard,
    PostService,
    ProfilService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
