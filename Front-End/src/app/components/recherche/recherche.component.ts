import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Subscription } from 'rxjs';
/********* Service,s *********/
import { ProfilService } from '../../services/profil.service';
/********* Modèle,s *********/
import { User } from '../../models/profil.model';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit, OnDestroy {

  page = 'recherche';
  users: User[] = [];
  user: User = {
    id: undefined,
    pseudo: '',
    prenom: '',
    nom: '',
  };
  
  userSubscription: Subscription | any;

  constructor(private profilService: ProfilService) { }

  ngOnInit(): void {
  //   this.userSubscription = this.profilService.userSubject.subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     }
  //   );
  //   this.profilService.emitUsers()
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

  ngOnDestroy(): void {
  //     this.userSubscription.unsubscribe();
  }

}
