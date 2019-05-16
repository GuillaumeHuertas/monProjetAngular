import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

// Cette classe va permettre d'empêcher d'aller sur des pages
// si l'utilisateur n'est pas authentifié
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {

        if(this.authService.isAuth) {
            return true; 
        } else {
            this.router.navigate(['/auth']); 
        }

    }
}