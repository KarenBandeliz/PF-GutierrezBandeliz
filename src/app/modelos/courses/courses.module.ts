import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesService } from 'src/app/services/courses.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
 
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CoursesComponent } from './courses.component';



@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CoursesRoutingModule
  ],providers: [CoursesService]
})

export class CoursesModule { }
