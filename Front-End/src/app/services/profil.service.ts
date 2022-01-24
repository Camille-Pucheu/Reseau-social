import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/profil.model";

// const baseUrlProfil = 'http://localhost:5500/profil';
// const baseUrlRecherche = 'http://localhost:5500/recherche';
const baseUrlProfil = 'https://projet-final-devjs.herokuapp.com/profil';
const baseUrlRecherche = 'https://projet-final-devjs.herokuapp.com/recherche';

@Injectable()
// Pour injecter un service dans un autre service @Injectable()
export class ProfilService {

  constructor(private http: HttpClient) {}

/********************************************* 
*************** Identification ***************
**********************************************/

  authentification(data: any): Observable<any> {
    return this.http.post(`${baseUrlProfil}/identification/connection`, data);
  }

  creationDeProfil(data: any): Observable<any> {
    return this.http.post(`${baseUrlProfil}/identification/inscription`, data);
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

  rechercheParPseudo(pseudo: string): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrlRecherche}?pseudo=${pseudo}`);
  }

  rechercheParPrenom(prenom: string): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrlRecherche}?prenom=${prenom}`);
  }

  rechercheParNom(nom: string): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrlRecherche}?nom=${nom}`);
  }

}