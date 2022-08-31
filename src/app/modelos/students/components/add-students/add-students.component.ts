import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlumnosI } from 'src/app/interfaces/alumnos';
import { StudentsService } from 'src/app/services/students.service';


@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})


export class AddStudentsComponent implements OnInit {
  sex: any[] = ['Masculino','Femenino'];
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { 
    this.form =  this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: ['', Validators.required],
    })
  }
  openSuccessSnackBar(){
    this.snackbar.open("Se agregó estudiante", "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar', 'add-snackbar'],
    });
  }


openFailureSnackBar(){
  this.snackbar.open("Error", "", {
    duration: 3000,
    panelClass: ['red-snackbar','error-snackbar'],
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    });
}
  
  ngOnInit(): void {
  
  }

  goBack(){
    this.router.navigate(['/dashboard/students'])
  }
  onAddStudent(){
      const student: AlumnosI= {
        email: this.form.value.email,
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        sex: this.form.value.sex,
      }
      this.studentService.addStudent(student).then(() =>{
        this.openSuccessSnackBar()
        this.router.navigate(['/dashboard/alumnos'])

      }).catch(() => this.openFailureSnackBar());
      
  }
}
