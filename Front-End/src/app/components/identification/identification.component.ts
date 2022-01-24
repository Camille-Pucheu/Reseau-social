import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/********* Service,s *********/
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-connection',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService, 
              private router: Router) { }

              
  ngOnInit(): void {
    if (this.authentificationService.idUtilisateurConnecte !== 'connection') {
      this.renvoiVersProfil(this.authentificationService.idUtilisateurConnecte, this.authentificationService.pseudoUtilisateurConnecte);
    }
  }

  renvoiVersProfil (id: any, pseudo: string|undefined) {
    const newIdUrl = 'profil/' + id;
    this.authentificationService.connection(id, pseudo).then( () => {
      this.router.navigate([newIdUrl]);
    } )
  }
  
}
