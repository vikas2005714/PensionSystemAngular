import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PensiondetailsComponent } from './pensiondetails/pensiondetails.component';
import { ProcessPensionComponent } from './process-pension/process-pension.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {path:"Login",component:LoginComponent},
  {path:"Register",component:RegisterComponent},
  {path:"PensionDetails",component:PensiondetailsComponent,canActivate :[AuthService],
  children:[
    {path:"PensionProcess",component:ProcessPensionComponent}
  ]
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
