import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserI } from 'src/app/interfaces/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  public listUsers: Array<UserI> = new Array<UserI>();
  public isAdmin: boolean = false;
  displayedColumns: string[] = ['email', 'Nombre', 'Apellido', 'roles','actions'];
  public studentId: string | null = null;
  public dataSource :any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _usersService: UsersService,
    private authService: AuthService,
    public activedRoute: ActivatedRoute,
    private snackbar: MatSnackBar) { }



  ngOnInit(){
    this.authService.getRoles().then((roles: boolean) =>{
      this.isAdmin = roles;
      if(this.isAdmin === true) {
        this.displayedColumns = ['email', 'Nombre', 'Apellido', 'roles','actions'];
      }else{
        this.displayedColumns = this.displayedColumns.filter(c => c !== 'actions')
      }
    });

    this._usersService.getAllUsers().subscribe(users => {
      this.listUsers = users;
      this.dataSource = new MatTableDataSource(this.listUsers)
      this.paginator = this.dataSource.paginator;
      this.sort = this.dataSource.sort
    } )

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id:string){
    this._usersService.deleteUser(id).then(() => {
      this.snackbar.open('Se eliminó el usuario','', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom', 
      })
      }).catch(() => {
        this.snackbar.open('Error','', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
    })
    
  }

}
