import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../_auth/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  realPermission: number = 0;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedPermission = route.data['expectedPermission'];
    const permission = this.tokenService.getAuthorities();

      for (let expected of expectedPermission) {
        if (permission == expected) {
          this.realPermission = permission;
        }
      }


    if (!this.tokenService.getToken() || expectedPermission.indexOf(this.realPermission) === -1) {
      this.router.navigate(['']);
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(this.tokenService.getToken())) {
        this.tokenService.logOut();
      }
      return false;
    }
    const helper = new JwtHelperService();
    if (helper.isTokenExpired(this.tokenService.getToken())) {
      this.tokenService.logOut();
      return false;
    }

    return true;
  }
  constructor(private tokenService: TokenService, private router: Router) { }
}
