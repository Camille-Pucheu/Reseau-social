import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/********* Service,s *********/
import { ProfilService } from '../../services/profil.service';
import { AuthentificationService } from '../../services/authentification.service';
/********* Modèle,s *********/
import { User } from 'src/app/models/profil.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnChanges {

  page: string = 'profil';
  dataPosts: any;
  newPostAdd: boolean = false;
  userId: any;
  userPseudo: any;
  autoprofil: boolean = false;
  admin: boolean = false;

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
    this.profilAAfficher();
  }

  ngOnChanges(): void {
    this.profilAAfficher();
  }

  profilAAfficher () {
    // Si on se trouve sur la page profil
    if (this.route.snapshot.routeConfig?.path == 'profil') {
      this.userId = this.authentificationService.idUtilisateurConnecte;
      this.admin = this.authentificationService.administrateur;
      this.autoprofil = true;
      this.afficherSonProfil(this.userId);
    } else {
      // Sinon, on récupère l'id de l'url
      this.userId = this.route.snapshot.params["id"];
      // Si l'id est celui de l'utilisateur connecté
      if (this.userId == this.authentificationService.idUtilisateurConnecte) {
        this.admin = this.authentificationService.administrateur;
        this.autoprofil = true;
        this.afficherSonProfil(this.userId);
      } else {
        this.admin = this.authentificationService.administrateur;
        this.afficherUnProfil(this.userId);
      }
    }
  }

  newPost(retour: boolean) {
    this.newPostAdd = retour;
    this.profilAAfficher();
  }

/********************************************* 
**************** Profil connecté *************
**********************************************/

  afficherSonProfil (userId: any) {
    this.page = 'profil';
    const id = userId;
    this.profilService
      .consulterSonProfil(id)
      .subscribe({
        next: (data) => {
          this.profil = data[0];
          this.dataPosts = data[1];
        },
        error: (e) => console.error(e)
      });
  }

  seDeconnecter() {
    this.authentificationService.deconnexion();
    this.router.navigate(['profil/identification'])
  }

/********************************************* 
**************** Autres Profils **************
**********************************************/

  afficherUnProfil (userId: any) {
    this.page = 'recherche';
    const id = userId;
    this.profilService
      .consulterUnProfil(id)
      .subscribe({
        next: (data) => {
          this.profil = data[0];
          this.dataPosts = data[1];
        },
        error: (e) => console.error(e)
      });
  }

/********************************************** 
*********** Modification de profil ************
**********************************************/

  modifierLeProfil () {

  }

  supprimerLeProfil() {
    if (this.userId == '61eade7172000ada2562e262') {
      alert("Profil administrateur principal, ne pas supprimer.");
    } else {
      this.profilService.supprimerSonProfil(this.userId)
      .subscribe({
        next: (data) => {
          alert('Profil supprimé!');
          if (this.autoprofil == true) {
            this.seDeconnecter();
          } else {
            this.router.navigate(['recherche']);
          }
        },
        error: (e) => console.error(e)
      });
    }
  }

}
