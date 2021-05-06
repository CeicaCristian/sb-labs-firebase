import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {
  }

  addUserToFirestore(doc: User, id: string) {
    return this.firestore.collection("Users").doc(id).set(doc);
  }

  getAllUsersFromFirestore() {
    return this.firestore.collection("Users").valueChanges();
  }
}
