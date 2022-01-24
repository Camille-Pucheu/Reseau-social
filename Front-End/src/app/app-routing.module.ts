import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { ConnectionComponent } from './components/identification/connection/connection.component';
import { InscriptionComponent } from './components/identification/inscription/inscription.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RechercheComponent } from './components/recherche/recherche.component';

import { AuthGuard } from './services/auth.guard.service';

const routes: Routes = [
  { path: 'profil/identification', component: IdentificationComponent,
      children: [
        { path: 'connection', component: ConnectionComponent },
        { path: 'inscription', component: InscriptionComponent },
      ]
  },
  { path: 'profil/:id', canActivate: [AuthGuard], component: ProfilComponent },
  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },
  { path: 'messages', canActivate: [AuthGuard], component: MessagesComponent},
  { path: 'recherche/:id', canActivate: [AuthGuard], component: ProfilComponent},
  { path: 'recherche', canActivate: [AuthGuard], component: RechercheComponent},
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
