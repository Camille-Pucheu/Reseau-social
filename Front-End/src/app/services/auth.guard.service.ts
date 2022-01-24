import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from "./authentification.service";

@Injectable()
// Pour injecter un service dans un autre service @Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authentificationService: AuthentificationService,
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if(this.authentificationService.authentification) {
            return true;
        } else {
            return this.router.navigate(['profil/identification']);
        }
        
    }
}