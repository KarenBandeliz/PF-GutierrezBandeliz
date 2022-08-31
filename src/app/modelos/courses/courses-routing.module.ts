import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {path: '',
  component:CoursesComponent},
  {path:'create', component: AddCourseComponent},
  {path:'edit/:id', component: EditCourseComponent},
/*   {path:'details/student/:id', component: DetailsStudentComponent} */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
