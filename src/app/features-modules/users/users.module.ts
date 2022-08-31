import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersService } from 'src/app/services/users.service';
import { UsersRoutingModule } from './users-routing.module';




@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent,
    DetailsUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    FormsModule
  ],providers: [UsersService]
})
export class UsersModule { }
