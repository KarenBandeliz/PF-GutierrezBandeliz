import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CursosI } from 'src/app/interfaces/cursos';

import { CoursesService } from 'src/app/services/courses.service';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public listCourses: Array<CursosI> = new Array<CursosI>();

  public isAdmin: boolean = false;
  displayedColumns: string[]  =  ['Nombre', 'Profesor', 'Fecha', 'acciones'];
  public dataSource :any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _coursesService: CoursesService,
    private authService: AuthService,
    public activedRoute: ActivatedRoute,
    private snackbar: MatSnackBar) { }
    
  ngOnInit(){
    this.authService.getRoles().then((roles: boolean) =>{
      this.isAdmin = roles;
      if(this.isAdmin === true) {
        this.displayedColumns = ['Nombre', 'Profesor', 'Fecha', 'acciones'];
      }else{
        this.displayedColumns = this.displayedColumns.filter(c => c !== 'acciones')
      }
    });
  
    this._coursesService.getAllCourses().subscribe(courses => {
      this.listCourses = courses;
      this.dataSource = new MatTableDataSource(courses)
      this.paginator = this.dataSource.paginator;
      this.sort = this.dataSource.sort
    } )

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStudent(id:string){
    this._coursesService.deleteStudent(id).then(() => {
      this.snackbar.open('Se eliminó el curso','', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom', 
      })
      }).catch(() => {
        this.snackbar.open('Ocurrió un error','ok', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
    })
  }
}
