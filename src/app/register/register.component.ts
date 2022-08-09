import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register!: FormGroup;
  constructor(private fb : FormBuilder,private service : UserService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      email: ['',[Validators.required]],
      name:[''],
      password:['']
      
      
    });
  }

  submit()
  {
    let email = this.register.controls["email"];
    let name = this.register.controls["name"];
    let password = this.register.controls["password"];
    this.service.Register(email.value,name.value,password.value).subscribe((data)=>{
      console.log(data);
    },error => {
      console.log(error);
    })
    console.log(email.value);


  }


}
