import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;
  public loggedIn: boolean ;
  public userExist: any;
  public status:any = {} ;
  public userStatusChanges: BehaviorSubject<any> = new BehaviorSubject(this.status);
  public role: any;
  public isAdmin: boolean = false;

  setUserStatus(userStatus: any):void{
    this.status = userStatus;
    this.userStatusChanges.next(this.status);
  }

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.loggedIn = false;
    this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.userExist = user;
          this.loggedIn = true;  
        }else{
          this.loggedIn = false;
        }
    })
  }
  
  getUserState(){
    return  this.afAuth.authState
  }
  deleteUser (){
    this.afAuth.onAuthStateChanged((user)=>{ user?.delete().then((u)=>{console.log(u,"user deleted")})}).catch(error => {console.log("error deleting user")})

  }


  singup(user: any): Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(user.userEmail, user.userPassword)
      .then((result)=>{
        result.user?.updateProfile({
          displayName: user.userName + ' ' + user.userLastName ,
        })
        this.newUser =result.user;
        this.insertUserDataToDb(result.user,user).catch(error => {      return { isValid: false, message: error.message}})
        result.user?.sendEmailVerification();
      })
      .catch(error => {
        console.log('Error: ' + error)
        console.log('Error code: ' + error.code)
        return { isValid: false, message: error.message}
      }); 
  }

  login(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result)=>{
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      console.log('Error: ' + error)
      console.log('Error code: ' + error.code)
      return { isValid: false, message: error.message}
    }); 
  }

  insertUserDataToDb(userCredential: any,userFormdata: any):Promise<any>{
    console.log(userCredential.displayName,'USER')
    let data = {
      firstname: userFormdata.userName,
      lastname: userFormdata.userLastName,
      email: userFormdata.userEmail,
      role: {admin:true}
    }
    return this.db.doc(`Users/${userCredential.uid}`).set(data)

  }
  
  getUserById(id:any){
    return this.db.collection<any>('Users').doc(id).snapshotChanges().pipe(
      map(action =>action.payload.data()))
  }

  getRoles(): Promise<any>{ 
    return new Promise((resolve,reject) =>{
      this.afAuth.onAuthStateChanged((user)=>{
        this.getUserById(user?.uid).subscribe((u) =>{ 
          if(u?.role?.admin){
            resolve(true);
          }else{
            resolve(false);
            reject()
          }
        })
      })
    })
  }

  logout(){
    this.status = ''
    this.userExist = null;
    this.setUserStatus(null)
    return this.afAuth.signOut()
  }
}
