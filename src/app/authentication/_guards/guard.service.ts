import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../_auth/token.service';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  realPermission: string = "";

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedPermission = route.data['expectedPermission'];
    const permission = this.tokenService.getPermission();
    //const permissions = this.tokenService.getAuthorities();


    for (let expected of expectedPermission) {
      if (permission == expected) {
        this.realPermission = permission;
      }
    }

    if (!this.tokenService.getToken() || expectedPermission.indexOf(this.realPermission) === -1) {
      if(permission!=null){
        if(permission=="2"){
          this.router.navigate(['nebular']);
        }else{
          this.router.navigate(['']);
        }

      }else{
        this.router.navigate(['login']);
      }

      return false;
    }
    return true;
  }

  constructor(private tokenService: TokenService, private router: Router) { }
}
