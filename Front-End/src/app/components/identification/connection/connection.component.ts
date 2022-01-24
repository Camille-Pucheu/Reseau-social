import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
/********* Service,s *********/
import { AuthentificationService } from '../../../services/authentification.service';
import { ProfilService } from '../../../services/profil.service';
/********* Modèle,s *********/
import { User } from 'src/app/models/profil.model';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  userInfos : User[] = [];

  erreurConnection = false;

  constructor(private authentificationService: AuthentificationService, 
              private router: Router,
              private profilService: ProfilService) { }

              
  ngOnInit(): void {
    if (this.authentificationService.idUtilisateurConnecte !== 'connection') {
      this.renvoiVersProfil(this.authentificationService.idUtilisateurConnecte, this.authentificationService.pseudoUtilisateurConnecte);
    }
  }
  

/********************************************* 
***************** Connection *****************
**********************************************/
  
  onSubmit(form: NgForm) {
    this.erreurConnection = true;
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
    this.authentificationService.connection(id, pseudo).then( () => {
      this.router.navigate([newIdUrl]);
    } )
  }
  
}
