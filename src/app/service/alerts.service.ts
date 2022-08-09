import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  simpleAlert(msg:string){  
    Swal.fire(msg);  
  }  
  alertWithSuccess(sucessMsg:string){  
    Swal.fire('Thank you...',sucessMsg, 'success')  
  }  
  erroalert(Errorname:string)  
  {  
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: Errorname,  
      footer: '<a href>Why do I have this issue?</a>'  
    })  
  }  
}


