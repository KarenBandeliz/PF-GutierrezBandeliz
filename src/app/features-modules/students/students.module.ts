import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentsComponent } from './components/add-students/add-students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { DetailsStudentComponent } from './components/details-student/details-student.component';
import { StudentsService } from 'src/app/services/students.service';



@NgModule({
  declarations: [AddStudentsComponent, EditStudentComponent, DetailsStudentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    StudentsRoutingModule
  ],providers: [StudentsService]
})
export class StudentsModule { }
