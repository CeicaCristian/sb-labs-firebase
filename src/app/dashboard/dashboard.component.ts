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
  // DEBOUNCE HTTP REQUESTS
  public searchQuery: string = "";
  public searchQueryChanged: Subject<string> = new Subject<string>();

  constructor(private firestoreService: FirestoreService) {
    // for each new value emitted, debounceTime method from rxjs will add 3s before setting the new value to the search string and calling the method wich will make the request to the API
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

  public searchFieldModified(newValue: string) {
    // each time the search field modifies, the new value will be passed to the subscriber
    this.searchQueryChanged.next(newValue);
  }

  public searchForUsersInApi() {
    // this will be the actual request to the API
    console.log('request API to search for  users: ')
    console.log(this.searchQuery);
  }

}
