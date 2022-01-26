import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
/********* Service,s *********/
import { AuthentificationService } from '../../../services/authentification.service';
import { ProfilService } from '../../../services/profil.service';
/********* Modèle,s *********/
import { User } from 'src/app/models/profil.model';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  userInfos : User[] = [];

  erreurConnexion = false;

  constructor(private authentificationService: AuthentificationService, 
              private router: Router,
              private profilService: ProfilService) { }

              
  ngOnInit(): void {
    if (this.authentificationService.idUtilisateurConnecte !== 'connexion') {
      this.renvoiVersProfil(this.authentificationService.idUtilisateurConnecte, this.authentificationService.pseudoUtilisateurConnecte);
    }
  }
  

/********************************************* 
***************** Connexion *****************
**********************************************/
  
  onSubmit(form: NgForm) {
    this.erreurConnexion = true;
    this.interrogeLeServeur(form.value);
  }
  

  interrogeLeServeur(formData: any) {
    const data = formData;
    this.profilService
      .authentification(data)
      .subscribe({
        next: (res) => {
          this.userInfos = res;
          this.renvoiVersProfil(this.userInfos[0].id, this.userInfos[0].pseudo)
        },
        error: (e) => console.error(e)
      });
  }

  renvoiVersProfil (id: any, pseudo: string|undefined) {
    const newIdUrl = 'profil/' + id;
    this.authentificationService.connexion(id, pseudo).then( () => {
      this.router.navigate([newIdUrl]);
    } )
  }
  
}
