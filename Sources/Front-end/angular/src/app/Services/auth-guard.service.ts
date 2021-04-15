import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null)
      {
        let roles = next.data["roles"] as Array<string>;
        if (roles) {
          // var match = this.userService.roleMatch(roles);
          // if (match) return true;
          // else {
          //   this.router.navigate(['/403']);
          //   return false;
          // }
          return true;
        }
        else
          return true;
      }
      this.router.navigate(['Login']);
      return false;
  }
  
}
