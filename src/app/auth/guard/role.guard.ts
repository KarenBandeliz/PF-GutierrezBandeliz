import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild , Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AngularFireAuth,private userService: AuthService, private router: Router){}
  public role: any;
  public login: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject) =>{
        this.authService.onAuthStateChanged((user)=>{
          this.userService.getUserById(user?.uid).subscribe((u) =>{ 
            if(u?.role?.admin){
              resolve(true);
            }else{
              resolve(false);
            }
          })
        })
      })
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject) =>{
        this.authService.onAuthStateChanged((user)=>{
          this.userService.getUserById(user?.uid).subscribe((u) =>{ 
            if(u?.role?.admin){
              resolve(true);
            }else{
              resolve(false);
            }
          })
        })
      })
  }
  
}
