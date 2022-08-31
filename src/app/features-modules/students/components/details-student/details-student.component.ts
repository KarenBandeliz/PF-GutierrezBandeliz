import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-details-student',
  templateUrl: './details-student.component.html',
  styleUrls: ['./details-student.component.css']
})
export class DetailsStudentComponent implements OnInit {
  sex: any[] = ['Masculino','Femenino'];
  public student: any
  public studentIdParams: any 

  constructor(
    private router :Router,
    private studentService: StudentsService,
    public activedRoute: ActivatedRoute,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe((param) => {
      this.studentIdParams = param.get('id'); 
     });
  
    this.studentService.getStudentById(this.studentIdParams).subscribe(data => {
      if(this.studentIdParams){
        this.student = data;
      }
    
         
      })

  }
  backBtn(){
    this.router.navigate(['/dashboard/students'])
  }
}
