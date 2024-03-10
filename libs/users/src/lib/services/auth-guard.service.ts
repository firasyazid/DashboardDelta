import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

 
  constructor(private router: Router, private localStorageToken: LocalstorageService , private authService:AuthService) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      const isAdmin = tokenDecode.isAdmin;

      if (!this._tokenExpired(tokenDecode.exp)) {
        // Set the admin status in the AuthService
        this.authService.setAdminStatus(isAdmin);
        return true;
      }
    }

    this.router.navigate(['/dashboard']);
    return false;
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
