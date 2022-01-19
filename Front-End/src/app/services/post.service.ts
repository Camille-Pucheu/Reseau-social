import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PostModel } from "../models/post.model";

const baseUrl = 'http://localhost:5500'

@Injectable()
// Pour injecter un service dans un autre service @Injectable()
export class PostService {
    
    constructor(private http: HttpClient) {}

/********************************************* 
****************** Accueil *******************
**********************************************/

    voirTousLesPosts(): Observable<PostModel[]> {
        return this.http.get<PostModel[]>(`${baseUrl}/accueil`);
    }

    creerUnPost(data : any): Observable<any> {
        return this.http.post(`${baseUrl}/accueil`, data);
    }

/********************************************* 
******************* Profil *******************
**********************************************/

    affichageDesPostsDeSonProfil(id: any): Observable<PostModel[]> {
        return this.http.get<PostModel[]>(`${baseUrl}/profil/${id}`);
    }

    
/********************************************* 
***************** Recherche ******************
**********************************************/
    
    affichageDesPostsDUnProfil(id: any): Observable<PostModel[]> {
        return this.http.get<PostModel[]>(`${baseUrl}/recherche/${id}`);
    }

}