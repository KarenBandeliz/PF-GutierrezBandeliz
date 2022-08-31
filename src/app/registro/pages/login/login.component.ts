import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup 
  public loading: boolean = false;
  public firebaseErrorMessage: string ;
  
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    ) {
    this.firebaseErrorMessage = '';
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  signIn(){
    const { username, password } = this.loginForm.value
    this.loading = true;
    if(this.loginForm.valid){
      this.loading = false;
      this.authService.login(username, password).then((response) =>{
        console.log(response,'response');
        
      if(response?.message == undefined){
        this.loged()
        this.loading = false;
      }else{
        this.loading = false;
        this.firebaseErrorMessage = response?.message.replace('Firebase:', '').split('.')[0]
        this.invalid(this.firebaseErrorMessage)  
      }

      })

    }
    
  }

  invalid(message: string){
    this.snackbar.open(message,'ok', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: ['red-snackbar','error-snackbar'],
      verticalPosition: 'bottom',
    })
  }

  loged(){
    this.snackbar.open('Hola','Bienvenido', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: ['snackbar', 'add-snackbar'],
      verticalPosition: 'bottom',
    })
  }
  
  userNotExist(){
    this.snackbar.open('Usuario no existe','Intentar de nuevo', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
    })
  }
  snackbarMessage(){
    this.snackbar.open('Usuario o Contraseña incorrectos','ok', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
    })
  }

  fakeLoading(){
    this.loading =true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }
}
