import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CursosI } from 'src/app/interfaces/cursos';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  sex: any[] = ['Masculino','Femenino'];
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { 
    this.form =  this.fb.group({
      Nombre: ['', Validators.required],
      Profesor: ['', Validators.required],
      Fecha: ['', Validators.required],
    })
  }

  ngOnInit(): void {
   
  }
  openSuccessSnackBar(){
    this.snackbar.open('Se agregó el curso', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'add-snackbar'],
     });
  }


  openFailureSnackBar(){
    this.snackbar.open('Error', 'ok', {
      duration: 3000,
      panelClass: ['red-snackbar','error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      });
  }

  goBack(){
    this.router.navigate(['/dashboard/courses'])
  }
  onAdd(){
      const student: CursosI= {
        Nombre: this.form.value. Nombre,
        Profesor: this.form.value.Profesor,
        Fecha: this.form.value.Fecha,
      }
      this.coursesService.addStudent(student).then(() =>{
        this.openSuccessSnackBar()
        this.router.navigate(['/dashboard/courses'])
      }).catch(() => this.openFailureSnackBar());   
  }
}
