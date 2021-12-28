import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  profil = {
    pseudo : 'Pseudo',
    message : {
      texte : 'Ici le message de Pseudo',
      date : 'date de publication'
    } 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
