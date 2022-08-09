import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import {PensionDatas} from '../data/pension.data';
import {PensionData} from '../data/PensionData.data'
import { FormBuilder } from '@angular/forms';
import { ProcessPensionComponent } from '../process-pension/process-pension.component';



@Component({
  selector: 'app-pensiondetails',
  templateUrl: './pensiondetails.component.html',
  styleUrls: ['./pensiondetails.component.css']
})
export class PensiondetailsComponent implements OnInit {

  declare pensiondata:PensionDatas;
  declare bankd:PensionData;
  flag = false;
  flag1 = false;
  declare pensionerName:string;
 // update = false;
 // updateForm!: FormGroup;
  @ViewChild(ProcessPensionComponent) declare child:ProcessPensionComponent;
  constructor(private service : UserService) { }

  ngOnInit(): void {
    // this.updateForm = this.fb.group({
    //   name: ['',[Validators.required]],
    //   state:[''],
    //   createdBY:[''],
    //   estabilishBy:['']
    // });

    // this.service.changeindetails.subscribe((data) =>
    // {
    //   this.pensiondata= data;
    // })
    this.pensionerName = localStorage.getItem('pensionerName') as string;
    this.service.getAddhardetails.subscribe((data:PensionData)=>
    {
      console.log("data in ui bank");
      this.bankd = data;
      console.log(this.bankd);
      this.flag1 = true;
      this.flag = false;
    })
  }

  
  getdetail()
  {
    this.flag = true;
    this.flag1 = false;
    this.service.getdetails().subscribe((data:PensionDatas) =>{
      console.log(data);
     this.pensiondata = data;
    },error =>{console.log(error)});    
  }

  // updateflag()
  // {
  //  // const{id,name,state,createdBY,estabilishBy} = this.pensiondata;
  //   console.log(this.ipark);
  //  // this.updateForm.patchValue({name,state,createdBY,estabilishBy});
  //   this.update = true;
  //   this.flag = false;
  //   this.flag1 = true;

  // }

  // UpdateData()
  // {
  //   this.service.updatedetails(this.updateForm.value).subscribe((data) =>
  //   {console.log(data);
  //   this.service.changeindetails.emit(this.updateForm.value);
  //   this.update = false;
  //   this.flag1 = true;
  //   this.flag = true;
  //   },
  //   error =>{console.log(error)}

  //   )
  // }

  insertAadhar()
  {
    this.child.openModal();
  }
}
