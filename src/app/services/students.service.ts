import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlumnosI } from '../interfaces/alumnos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


export interface StudentID extends AlumnosI { id: string;}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private  firestore:AngularFirestore) {

  }

  getAllStudents(): Observable<any>{
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(action => action.map((a => {
        const data = a.payload.doc.data() as AlumnosI;
        const id =  a.payload.doc.id;
        return { id, ...data}
      }))))
  }

  deleteStudent(id: string): Promise<any>{
    return this.firestore.collection('students').doc(id).delete()
  }
  addStudent(student: AlumnosI): Promise<any>{
    return this.firestore.collection('students').add(student)

  }
  
  editStudent(id: string, student: AlumnosI): Promise<any>{
    return this.firestore.collection('students').doc(id).update(student)
  }
  getStudentById(id: string) : Observable<any>{
    return this.firestore.collection<AlumnosI>('students').doc(id).snapshotChanges().pipe(
      map(action => action.payload.data()))
  }

}
