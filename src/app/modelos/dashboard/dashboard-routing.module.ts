import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/public/home/home.component';



import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'' ,component:HomeComponent},
      {path:'students',loadChildren: ()=> import('../../features-modules/students/students.module').then(m => m.StudentsModule)},
      {path:'courses',loadChildren: ()=> import('../../features-modules/courses/courses.module').then(m => m.CoursesModule)},
      {path:'users',loadChildren: ()=> import('../../features-modules/users/users.module').then(m => m.UsersModule)},
    ]
  },
  /* {path:'students', loadChildren:(()=> import('./components/students/students.module').then(m => m.StudentsModule))}, */
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
