import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RechercheComponent } from './recherche/recherche.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfilComponent } from './profil/profil.component';
import { ConnectionInscriptionComponent } from './connection-inscription/connection-inscription.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './services/auth.guard.service';

const routes: Routes = [
  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },
  { path: 'messages', canActivate: [AuthGuard], component: MessagesComponent},
  { path: 'recherche', canActivate: [AuthGuard], component: RechercheComponent},
  { path: 'auth', component: ConnectionInscriptionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full'},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
