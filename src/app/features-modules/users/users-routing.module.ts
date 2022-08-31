import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {path: '',
  component:UsersComponent},
  {path:'create', component: AddUserComponent},
  {path:'edit/:id', component: EditUserComponent},
  {path:'details/user/:id', component: DetailsUserComponent}
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
