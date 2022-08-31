import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, ObservableInput } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { UserI } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private  firestore:AngularFirestore, private authService:AuthService) {}

   getAllUsers(): Observable<any>{
    return this.firestore.collection('Users').snapshotChanges().pipe(
      map(action => action.map((a => {
        const data = a.payload.doc.data() as UserI;
        const id =  a.payload.doc.id;
        return { id, ...data}
      }))))
  }

  deleteUser(id: string): Promise<any>{
    return this.firestore.collection('Users').doc(id).delete()
  }
  addUser(student: UserI): Promise<any>{
    return this.firestore.collection('Users').add(student)

  }
  
  editUser(id: string, user: UserI): Promise<any>{
    return this.firestore.collection('Users').doc(id).update(user)
  }
  getUserById(id: string) : Observable<any>{
    return this.firestore.collection<UserI>('Users').doc(id).snapshotChanges().pipe(
      map(action => action.payload.data()))
  }
}
