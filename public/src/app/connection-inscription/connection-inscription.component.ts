import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-connection-inscription',
  templateUrl: './connection-inscription.component.html',
  styleUrls: ['./connection-inscription.component.css']
})
export class ConnectionInscriptionComponent implements OnInit {

  authentificationStatus : boolean | undefined;

  connectionActif = true;
  inscriptionActif = false;

  onConnection() {
    this.connectionActif = true;
    this.inscriptionActif = false;
  }

  onInscription() {
    this.connectionActif = false;
    this.inscriptionActif = true;
  }

  constructor(private authentificationService: AuthentificationService, 
              private router: Router) { }
  
  ngOnInit(): void {
    this.authentificationStatus = this.authentificationService.authentification;
  }
  
  seConnecter() {
    this.authentificationService.connection().then( () => {
      this.authentificationStatus = this.authentificationService.authentification;
      this.router.navigate(['profil'])
    } )
  }

  seDeconnecter() {
    this.authentificationService.deconnection();
    alert('Deconnexion OK.'); 
    this.authentificationStatus = this.authentificationService.authentification;
  }

}
