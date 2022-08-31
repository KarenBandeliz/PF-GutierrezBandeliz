import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AlumnosI } from 'src/app/interfaces/alumnos';
import { StudentsService } from 'src/app/services/students.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {


  public listStudents: Array<AlumnosI> = new Array<AlumnosI>();
  public isAdmin: boolean = false;
  displayedColumns: string[] = ['email', 'nombre', 'apellido', 'sexo','acciones'];
  public studentId: string | null = null;
  public dataSource :any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _studentsService: StudentsService,
    private authService: AuthService,
    public activedRoute: ActivatedRoute,
    private snackbar: MatSnackBar) { }



  ngOnInit(){
    this.authService.getRoles().then((roles: boolean) =>{
      this.isAdmin = roles;
      if(this.isAdmin === true) {
        this.displayedColumns = ['email', 'name', 'lastname', 'sex','actions'];
      }else{
       
        this.displayedColumns = this.displayedColumns.filter(c => c !== 'actions')
      }
    });

    this._studentsService.getAllStudents().subscribe(students => {
      this.listStudents = students;
      this.dataSource = new MatTableDataSource(this.listStudents)
      this.paginator = this.dataSource.paginator;
      this.sort = this.dataSource.sort
    } )

  }


  loadStudents(){

      /* this.listStudents=[]; */
   
    /*   doc.forEach((element: any) => {
          this.listStudents.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
         
      }) */
    

   
  }

/*   editStudent(student: StudentI){
    this._studentsService.addStudentEdit(student)
  } */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStudent(id:string){
    this._studentsService.deleteStudent(id).then(() => {
      this.snackbar.open('Estudiante eliminado con exito','', {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom', 
      })
      }).catch(() => {
        this.snackbar.open('Ops.. ocurrio un error al eliminar','desaparecer', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        })
    })
    
    this.loadStudents()

  }


/*       //GET Student
      public getStudentById(studentId: string): Observable<Students>{
        let dataUrl = `${this.serverUrl}/students/${studentId}`;
        return this.httpClient.get<Students>(dataUrl).pipe(catchError(this.handleError))
    } */

}
