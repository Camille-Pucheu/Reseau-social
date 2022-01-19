import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/********* Service,s *********/
import { ProfilService } from '../../services/profil.service';
import { AuthentificationService } from '../../services/authentification.service';
/********* Modèle,s *********/
import { User } from 'src/app/models/profil.model';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  page: string = 'profil';
  dataPosts: any;
  userId: any;
  userPseudo: any;
  autoprofil: boolean = false;

  constructor(private profilService: ProfilService,
              private authentificationService: AuthentificationService, 
              private router: Router,
              private route: ActivatedRoute) { }

  profil: User = {
    pseudo : '',
    email: '',
    prenom : '',
    nom : '',
    genre : '',
    birthDate : '',
    rue : '',
    codePostal : '',
    ville : '',
    presentation : '',
    preferences : '',
    amis : [],
    createdAt : undefined
  }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path == 'profil') {
      this.userId = this.authentificationService.idUtilisateurConnecte;
      this.afficherSonProfil(this.userId);
      this.autoprofil = true;
    } else {
      this.userId = this.route.snapshot.params["id"];
      if (this.userId == this.authentificationService.idUtilisateurConnecte) {
        this.autoprofil = true;
        this.afficherSonProfil(this.userId);
      } else {
        this.afficherUnProfil(this.userId);
      }
    }
  }

/********************************************* 
**************** Profil connecté *************
**********************************************/

  afficherSonProfil (userId: any) {
    const id = userId;
    this.profilService
      .consulterSonProfil(id)
      .subscribe({
        next: (data) => {
          console.log('consulterSonProfil = ', data[1])
          this.profil = data[0];
          this.dataPosts = data[1];
        },
        error: (e) => console.error(e)
      });
  }

  seDeconnecter() {
    this.authentificationService.deconnection();
    this.router.navigate(['profil/connection'])
  }

/********************************************* 
**************** Autres Profils **************
**********************************************/

  afficherUnProfil (userId: any) {
    const id = userId;
    this.profilService
      .consulterUnProfil(id)
      .subscribe({
        next: (data) => {
          console.log('consulterUnProfil = ', data[1])
          this.profil = data[0];
          this.dataPosts = data[1];
          console.log('this.dataPosts = ', this.dataPosts)
        },
        error: (e) => console.error(e)
      });
  }

}
