import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
/********* Service,s *********/
import { ProfilService } from '../../services/profil.service';
/********* Modèle,s *********/
import { User } from '../../models/profil.model';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  page = 'recherche';
  users: User[] = [];
  user: User = {
    id: undefined,
    pseudo: '',
    prenom: '',
    nom: '',
  };

  constructor(private profilService: ProfilService) { }

  ngOnInit(): void {
    this.afficherTousLesProfils();
  }

  afficherTousLesProfils(): void {
    this.profilService
      .voirTousLesProfils()
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (e) => console.error(e)
      })
  }

  onSubmit(form: NgForm): void  {
    const search: string = form.value.search;
    const findBy: string = form.value.findBy;
    if(findBy == 'pseudo') {
      this.profilService.rechercheParPseudo(search)
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (e) => console.error(e)
      })
    } else if (findBy == 'prenom') {
      this.profilService.rechercheParPrenom(search)
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (e) => console.error(e)
      })
    } else if (findBy == 'nom') {
      this.profilService.rechercheParNom(search)
        .subscribe({
          next: (data) => {
            this.users = data;
          },
          error: (e) => console.error(e)
        })
    }
  }

}
