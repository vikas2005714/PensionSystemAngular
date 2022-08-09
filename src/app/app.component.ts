import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoginRegister';
  constructor(private route :Router,private service:UserService){}

  logOut()
  {
    this.service.Logout();
  }

  get isUserLogin()
  {
    const token = localStorage.getItem("userInfo");
    return token && token.length > 0
  }
}


