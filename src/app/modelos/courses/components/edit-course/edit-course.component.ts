import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosI } from 'src/app/interfaces/cursos';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  public sex: any[] = ['Masculino','Femenino'];
  public formEdit: FormGroup;
  public curso: any
  public courseIdParams: any 
  public courseEdit : any
  
  constructor(
    private fb: FormBuilder,
     private coursesService: CoursesService,
     public activedRoute: ActivatedRoute,
     private router: Router,
     private snackbar: MatSnackBar
  ) { 
    this.formEdit =  this.fb.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
      startDate: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((param) => {
      this.courseIdParams = param.get('id'); 
     });
  
    this.coursesService.getStudentById(this.courseIdParams).subscribe(data => {
      if(this.courseIdParams){
        this.formEdit.patchValue(data)  
      }
    })
  }

  goBack(){
    this.router.navigate(['/dashboard/courses'])
  }

  openSuccessSnackBar(){
    this.snackbar.open("Editado con exito", "OK", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'add-snackbar'],
     });
  }


openFailureSnackBar(){
  this.snackbar.open("Error", '', {
    duration: 3000,
    panelClass: ['red-snackbar','error-snackbar'],
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    });
}
  
  onEdit(){
    const student: CursosI = {
      Nombre: this.formEdit.value.Nombre,
      Profesor: this.formEdit.value.Profesor,
      Fecha: this.formEdit.value.Fecha,
    }
      if(this.courseIdParams){

        this.coursesService.editStudent(this.courseIdParams,student)
        .then(()=>{this.openSuccessSnackBar()
        this.router.navigate(['/dashboard/courses'])

      }).catch(() => this.openFailureSnackBar());
      }
  }
}
