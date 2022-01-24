import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PostModel } from "../models/post.model";

const baseUrl = 'http://localhost:5500/accueil'

@Injectable()
// Pour injecter un service dans un autre service @Injectable()
export class PostService {
    
    constructor(private http: HttpClient) {}

/********************************************* 
****************** Accueil *******************
**********************************************/

    voirTousLesPosts(): Observable<PostModel[]> {
        return this.http.get<PostModel[]>(`${baseUrl}`);
    }

    creerUnPost(data : any): Observable<any> {
        return this.http.post(`${baseUrl}`, data);
    }

}