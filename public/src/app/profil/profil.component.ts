import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profil = {
    pseudo : 'Pseudo',
    prenom : 'Prenom',
    nom : 'Nom',
    genre : 'Genre',
    dateDeNaissance : 'Date de naissance',
    rue : 'Rue',
    codePostal : 'CodePostal',
    ville : 'Ville',
    presentation : 'Texte de présentation',
    preferences : 'Texte de préférences',
    amis : 'Amis',
    dateCreationProfil : 'date',
  }

  constructor() { }

  onDeconnection() {
    alert('Vous êtes maintenant déconnecté');
  }

  ngOnInit(): void {
  }

}
