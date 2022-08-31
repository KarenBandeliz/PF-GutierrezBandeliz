import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {path:'login',component: LoginComponent},
      {path:'singup', component: SingupComponent},
      {path:'**', redirectTo: 'login'}
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
