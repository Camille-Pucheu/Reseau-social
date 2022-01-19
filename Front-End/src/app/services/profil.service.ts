import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { User } from "../models/profil.model";
import { PostModel } from "../models/post.model";

const baseUrlProfil = 'http://localhost:5500/profil';
const baseUrlRecherche = 'http://localhost:5500/recherche';

@Injectable()
// Pour injecter un service dans un autre service @Injectable()
export class ProfilService {

  // userSubject = new Subject<User[]>();

  // private users: User[] = [
  //   {
  //     pseudo: 'Administrateur',
  //     prenom: 'Camille',
  //     nom: 'PUCHEU',
  //     email: 'camille.pucheu@gmail.com',
  //     motDePasse: 'Charlotte',
  //     genre: 'Femme',
  //     presentation: 'Developpeur du site',
  //     preferences: 'HTML, CSS et Javascript',
  //   }
  // ];

  constructor(private http: HttpClient) {}


/********************************************* 
*************** Identification ***************
**********************************************/

  authentification(data: any): Observable<any> {
    return this.http.post(`${baseUrlProfil}/connection`, data);
  }

  creationDeProfil(data: any): Observable<any> {
    return this.http.post(`${baseUrlProfil}/connection/inscription`, data);
  }

/********************************************* 
*********** Consultation de profil ***********
**********************************************/

  consulterSonProfil(id: any): Observable<any> {
    return this.http.get(`${baseUrlProfil}/${id}`);
  }


/********************************************** 
*********** Modification de profil ************
**********************************************/
  
  mettreAJourSonProfil(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrlProfil}/${id}`, data);
  }
  
  supprimerSonProfil(id: any): Observable<any> {
    return this.http.delete(`${baseUrlProfil}/${id}`);
  }
  
/********************************************* 
****************** Recherche *****************
**********************************************/

  voirTousLesProfils(): Observable<User[]> {
    return this.http.get<User[]>(baseUrlRecherche);
  }

  consulterUnProfil(id: any): Observable<any> {
    return this.http.get(`${baseUrlRecherche}/${id}`);
  }

  // rechercheParPseudo(pseudo: any): Observable<User[]> {
  //   return this.http.get<User[]>(`${baseUrlRecherche}?pseudo=${pseudo}`);
  // }









  // emitUsers() {
  //   this.userSubject.next(this.users.slice());
  // }

  // addUser (user: User) {
  //   this.users.push(user);
  //   this.emitUsers();
  // }

  // saveUsersToServer() {
  //   return this.http
  //     .post('../Back-end/server.js', this.users)
  //     // .subscribe(
  //     //   () => {
  //     //     console.log('Enregitrement OK');
  //     //   },
  //     //   (error) => {
  //     //     console.log('Erreur de sauvegarde' + error);
  //     //   }
  //     // )
  //     .subscribe({complete: console.info});
  // }

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
}