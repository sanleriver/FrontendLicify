import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { TokenService } from 'src/app/authentication/_auth/token.service';

@Component({
  selector: 'auth-root',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogged = false;


  constructor(
    private router: Router,
    private tokenService: TokenService,) {

  }

  ngOnInit() {
    //const helper = new JwtHelperService();
    if (this.tokenService.getToken()) {
    
      this.isLogged = true;
      this.inactivityTime(this.tokenService.getUserName());
      
      //this.roles = this.tokenService.getAuthorities();
    } else {
      //this.router.navigate(['login']);
    }
  }

  inactivityTime(n) {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
      window.sessionStorage.clear();
      location.href = 'login'
    }

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(logout, 3600000)
      // 1000 milliseconds = 1 second
    }

  };
}
