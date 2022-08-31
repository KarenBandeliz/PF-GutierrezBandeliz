import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosI} from 'src/app/interfaces/alumnos';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  public sex: any[] = ['Masculino','Femenino'];
  public formEdit: FormGroup;
  public student: any
  public studentIdParams: any 
  public studentEdit : any
  
  constructor(
    private fb: FormBuilder,
     private studentService: StudentsService,
     public activedRoute: ActivatedRoute,
     private router: Router,
     private snackbar: MatSnackBar
  ) { 
    this.formEdit =  this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((param) => {
      this.studentIdParams = param.get('id'); 
    });
  
    this.studentService.getStudentById(this.studentIdParams).subscribe(data => {
      if(this.studentIdParams){
        this.formEdit.patchValue(data)  
      }
    
      })

  }
  goBack(){
   
    this.router.navigate(['/dashboard/students'])
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
  this.snackbar.open("No se pudo realizar la operacion", "reintentelo", {
    duration: 3000,
    panelClass: ['red-snackbar','error-snackbar'],
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    });
}
  
editStudent(){
    const student: AlumnosI = {
      email: this.formEdit.value.email,
      name: this.formEdit.value.name,
      lastname: this.formEdit.value.lastname,
      sex: this.formEdit.value.sex,
    }
      if(this.studentIdParams){

        this.studentService.editStudent(this.studentIdParams,student)
        .then(()=>{this.openSuccessSnackBar()
        this.router.navigate(['/dashboard/students'])

      }).catch(() => this.openFailureSnackBar());
      }
  }
}
