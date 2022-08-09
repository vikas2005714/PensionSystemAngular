import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AlertsService } from './alerts.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private route:Router,private alert : AlertsService ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    const token = localStorage.getItem("userInfo");
    if(token && token.length > 0)
    {
      return true;
    }
    else 
    {
      this.alert.simpleAlert('Please Login');
      this.route.navigate(["/Login"]);
      return false;
    }
  }
}
