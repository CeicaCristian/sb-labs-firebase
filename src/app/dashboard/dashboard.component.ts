import {Component, OnInit} from '@angular/core';
import {User} from "../interfaces/user";
import {FirestoreService} from "../services/firestore.service";
import {Observable, of, Subject, timer} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";

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
  public title: string = 'Welcome to our Dashboard';
  public numberOfActiveUsers: number = 2;
  public showTitle: boolean = true;

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

    // DEBUGGING
    // write clean code
    // use comments
    // use console.log, console.info, console.warn based on the importance of the message, so you can filter them in Chrome dev console
    // for VS IDE you can install, and you will have the developer console sync with your code in IDE:
    // => https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
    // use tap for observables (The Angular Tap RxJs operator returns an observable that is identical to the source. It does not modify the stream in any way.)
    // debugger set in your code
    // use source tab in Chrome dev console to inspect the code and set breakpoints
    // you can use json pipe for printing object in your template {{myObject | json }}
    // set profiler so you can track in your console how long it takes your app to detect changes (number of cycles, time per cycle)
    // => !it should be under 0.3
    // => set the code in main.ts
    // => in Chrome dev console use this command: ng.profiler.timeChangeDetection()

    // example of console log use
    console.log('inti method ', this.searchQuery);
    console.info('just a note')
    console.warn('big error')

    // debugger; // will set a breakpoint and you can follow all the stack steps

    // tap example for an observable, note that the value will remain the same after adding 2 inside tap
    const numbers = of(2, 4, 6, 8);
    const divider = numbers.pipe(
      tap(val => console.log('Value before ', val)),
      tap(val => {
        val = val + 2;
        console.log('Value inside increment ', val);
        return val;
      }),
      map(val => val / 2),
      tap(val => console.log('Value after', val))
    ).subscribe();
  }

  // this function was added for testing that it works well and after the call showTitle will be set to false (check dashboard.component.spec.ts)
  public toggleTile() {
    this.showTitle = !this.showTitle;
  }

  // this function was added for testing async calls (check dashboard.component.spec.ts)
  public asyncToggleTitle() {
    timer(500).subscribe(() => {
      this.toggleTile();
    });
  }

  public addUser(user: User) {
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
