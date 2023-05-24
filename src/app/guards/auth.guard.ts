import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){}

  canActivate(): boolean {
    if (!window.localStorage.getItem('token')){
      this.authService.removeToken();
      this.router.navigateByUrl('/landing');
      return false;
    }
    // const user = JSON.parse(localStorage.getItem('user') as string)
    return true;
  }
}
