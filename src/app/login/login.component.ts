import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertsService } from '../service/alerts.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registrationForm!: FormGroup;
  constructor(private fb : FormBuilder,private service:UserService,
    private alter:AlertsService,private jwtHelper :JwtHelperService,private route:Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['',[Validators.required]],
      password:['',[Validators.required]],
      
    });
  }

  get email()
  {
    return this.registrationForm.get('email');
  }

  submit()
  {
    let email = this.registrationForm.controls["email"];
    let password = this.registrationForm.controls["password"];
    this.service.Login(email.value,password.value).subscribe((data)=>{
      if(data.status == "Success" && data.user.token != null)
      {
      this.service.user = data.user;
      let date = new Date().getTime();
      let expdate =this.jwtHelper.getTokenExpirationDate(data.user.token) as Date;
      let time = expdate.getTime()- date;
      console.log(time);
      this.service.autoLogout(time);
      
      this.alter.alertWithSuccess(data.message);
      localStorage.setItem("userInfo",data.user.token);
      localStorage.setItem("pensionerName",data.user.userName);
      this.route.navigate(["/PensionDetails"]);
      }
      else{
          this.alter.erroalert(data.message);
      }
      
    },error => {
      console.log(error);
    })
    console.log(email.value);

  }



}
