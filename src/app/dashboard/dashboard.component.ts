import {Component, OnInit} from '@angular/core';
import {User} from "../interfaces/user";
import {FirestoreService} from "../services/firestore.service";
import {Observable, Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: User = {name: "", email: ""};
  public users: User[] = [];
  public usersList$: Observable<any> = new Observable<any>();
  public search: string = "";
  public searchQuery: string = "";
  public searchQueryChanged: Subject<string> = new Subject<string>();

  constructor(private firestoreService: FirestoreService) {
    this.searchQueryChanged.pipe(debounceTime(3000)).subscribe(model => {
      this.searchQuery = model;
      this.searchForUsersInApi();
    });
  }

  ngOnInit(): void {
    // this.firestoreService.getAllUsersFromFirestore().subscribe((res: any) => {
    //   this.users = res.map((item: any) => {
    //     item.dateAdded = item.dateAdded.toDate();
    //     return item
    //   });
    // })
    this.usersList$ = this.firestoreService.getAllUsersFromFirestore();
  }

  addUser(user: User) {
    const id = new Date().getTime().toString();
    const data: User = {
      name: user.name,
      email: user.email,
      dateAdded: new Date(),
      id: id
    }

    this.firestoreService.addUserToFirestore(data, id).then((res: any) => {
      console.log("User added");
    })
  }

  searchField(value: string) {
    this.searchQueryChanged.next(value);
  }

  searchForUsersInApi() {
    console.log('called')
    console.log(this.searchQuery);
  }

}
