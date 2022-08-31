import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CursosI } from '../interfaces/cursos';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private  firestore:AngularFirestore) { }

  getAllCourses(): Observable<any>{
    return this.firestore.collection('courses').snapshotChanges().pipe(
      map(action => action.map((a => {
        const data = a.payload.doc.data() as CursosI;
        const id =  a.payload.doc.id;
        return { id, ...data}
      }))))
  }

  deleteStudent(id: string): Promise<any>{
    return this.firestore.collection('courses').doc(id).delete()
  }
  addStudent(student:CursosI): Promise<any>{
    return this.firestore.collection('courses').add(student)

  }
  
  editStudent(id: string, student: CursosI): Promise<any>{
    return this.firestore.collection('courses').doc(id).update(student)
  }
  getStudentById(id: string) : Observable<any>{
    return this.firestore.collection<CursosI>('courses').doc(id).snapshotChanges().pipe(
      map(action => action.payload.data()))
  }
}

