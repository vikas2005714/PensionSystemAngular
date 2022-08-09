import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertsService } from '../service/alerts.service';
import { UserService } from '../service/user.service';
declare var window:any;

@Component({
  selector: 'app-process-pension',
  templateUrl: './process-pension.component.html',
  styleUrls: ['./process-pension.component.css']
})
export class ProcessPensionComponent implements OnInit {

  formModal:any;
  validationError: string = '';
  constructor(private service : UserService, private alter:AlertsService) { 

  }
 
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  openModal()
  {
    this.formModal.show();
  }

  submit(form:NgForm) //Addharno:string)
  {
    if (!form.valid) {
    var Addharno:any = form.value.aadharNumber;
    if (Addharno === '') {
      this.validationError = 'Please enter aadhaar number!';
    } else if (!Addharno.match(/^[0-9]+$/)) {
      this.validationError = 'Only integers allowed!';
     } 
    //  else if (Addharno.length != 12) {
    //   this.validationError = 'Length of the aadhaar number should 12';
    // }
    }

    if(form.valid)
    {
      this.formModal.hide();
      form.reset();
      this.validationError = '';
    }
    this.service.getDetailsByAdhar(parseInt(Addharno)).subscribe((data:any)=>{
      if(data.status== "Success")
      {
      this.service.getAddhardetails.emit(data.user);
      console.log(data.user);
      }
      else{
        this.alter.erroalert(data.message);
      }
    },error =>{console.log(error)});
    
    localStorage.setItem("AdharNo",Addharno);
  }
  

}
