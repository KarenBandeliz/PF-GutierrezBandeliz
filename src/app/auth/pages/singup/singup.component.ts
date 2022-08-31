import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingupComponent implements OnInit {
  public firebaseErrorMessage: string ;

  public loading: boolean = false;
  public userId: any;
  minvalue = 5;
  singUpForm : FormGroup;
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
        this.singUpForm = new FormGroup({
          'Email': new FormControl ('',[ Validators.required,Validators.email]),
          'Password': new FormControl ('',[Validators.required, Validators.min(this.minvalue)]),
          'Nombre': new FormControl ('', Validators.required),
          'Apellido': new FormControl ('', Validators.required),
        })
    this.firebaseErrorMessage = '';
  }
  
  ngOnInit(): void {
  }

  registro(){
    console.log(this.singUpForm.value,'values')
    if(this.singUpForm.invalid){
      return;
    }
    this.authService.singup(this.singUpForm.value)
      .then((result)=>{
        if(result == null){
          this.fakeLoading();
          this.crearUsuario()
            this.router.navigate(['/register/login']);
        }else if(result.message){
          this.firebaseErrorMessage =  result.message.replace('Firebase:', '').split('(')[0]
          this.invalido(this.firebaseErrorMessage)
        }
      })
  }

  invalido(message: string){
    this.snackbar.open(message,'ok', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: ['red-snackbar','error-snackbar'],
      verticalPosition: 'bottom', 
    })

  }
  
  crearUsuario(){
    this.snackbar.open('Usuario registrado','ok', {
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['snackbar', 'add-snackbar'],
      verticalPosition: 'bottom',
    })
  }

  snackbarmessage(){
    this.snackbar.open('Datos incorrectos','', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',  
    })
  }

  fakeLoading(){
    this.loading =false;
    setTimeout(() => {
      this.loading =true;
    }, 1500);
  }
}
