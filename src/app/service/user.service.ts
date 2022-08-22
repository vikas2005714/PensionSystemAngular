import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {PensionDatas} from '../data/pension.data';
import { AlertsService } from './alerts.service';


interface User {

  id:number,
  userName:string;
  password:string;	
  role?:string;	
  token:string;

}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  declare user:User;
  declare parks:PensionDatas;

  changeindetails = new EventEmitter();
  getAddhardetails = new EventEmitter();
  constructor(private http:HttpClient,private route:Router,private alert:AlertsService) { }

  Login(email:string,password:string)
  {
    
   return (this.http.post<any>("http://40.76.151.198/api/Users/UserLogin",
    {
      UserName:email,
      Password : password
    }));
  }

  Register(email:string,userName:string,password:string)
  {
    
    return(this.http.post<User>("https://localhost:44398/api/Users/Register",
    {
      UserName:email,
      Role : userName,
      Password : password
    }));
  }

  Logout()
  {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("AdharNo")
    localStorage.removeItem("pensionerName")
  }

  autoLogout(expirationTime:number)
  {
    
    setTimeout(() =>{
      this.Logout();
      this.alert.simpleAlert('Token Expired,Please Login');
      this.route.navigate(['/']);
    },expirationTime);
  }

  CurrentUsers(users:User)
  {
    this.user = users;
  }

  getdetails()
  {
    const header = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userInfo')}`
    });
    console.log(header);
    let adharno = localStorage.getItem('AdharNo') as string;

    let queryParams = new HttpParams().append("Ano",adharno);
    return(this.http.get<any>("http://40.76.148.191/api/PensionDetails/PensionDetails",{headers:header,params:queryParams}))
  }

  // updatedetails(parks:PensionDatas)
  // {
  //   const header = new HttpHeaders({
  //     'Authorization':`Bearer ${localStorage.getItem('userInfo')}`
      
  //   });
  //   console.log(header);

  //   return(this.http.post("https://localhost:44395/api/Users/Register",parks,
  //   {
  //     headers:header
  //   }));


  // }

  getDetailsByAdhar(AddharNo:Number)
  {
    const header = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userInfo')}`
      
    });
    
    console.log(AddharNo);

    return(this.http.post("http://40.76.149.135/api/ProcessPension/ProcessPensionDetails",
    {
      addharNo:AddharNo
    },
    {
      headers:header
    }));
  }

}
