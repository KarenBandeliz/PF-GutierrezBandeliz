import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsModule } from 'src/app/features-modules/students/students.module';
import { CoursesModule } from 'src/app/features-modules/courses/courses.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';


import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';

import { StudentsComponent } from 'src/app/features-modules/students/students.component';
import { CoursesComponent } from 'src/app/features-modules/courses/courses.component';
import { NavbarComponent } from 'src/app/public/navbar/navbar.component';
import { HomeComponent } from 'src/app/public/home/home.component';





@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    NavbarComponent,   
    StudentsComponent,
    CoursesComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StudentsModule,
    CoursesModule,
    FormsModule
  ]
})
export class DashboardModule { }
