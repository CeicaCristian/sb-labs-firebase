import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {FirestoreService} from "../services/firestore.service";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {FilterUsersPipe} from "../pipes/filter-users.pipe";

  // TESTING
  // Main categories:
    // => unit testing will test one single module like a component or a service
    // => integration testing will test the integration between different components and/or services, NOT all of them
    // => end to end, e2e, testing will test the workflow of the app, decoupled bu our code, you can write tests inside e2e folder
  // Angular comes with Jesmine (behaviour driven testing), Karma for lunching an browser instance and run all the tests
    // => the test will refresh at each code modification
    // => you can go deep with the configuration of Karma by editing karma.config.js file
    // => Jasmine sintax is based on describe (will create a test suite), it (will define a new test case), expect (will define the condition)
    // => https://jasmine.github.io/api/3.7/
    // => the last two tests, we can consider them as an integration test because we test the provided values from a service in our component
    // serviceStub will return some dummy data instead of Firebase, this can be done in real life testing so we don't affect the BE

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement; // rendered HTML, add this so we can use it to query the template by id, css class and others

  // main category of testing:
  // let serviceStub: any;

  let service: FirestoreService;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    // USED FOR RETURNING DUMMY DATA, identical with the DTO returned by Firebase service
    // serviceStub = {
    //   getAllUsersFromFirestore: () => of([{id: 1, name: "asdas", email: "asdas", dateAdded: new Date().getDate()}])
    // };
    await TestBed.configureTestingModule({
      // we must import routing, and firebase, and also declare our pipe because the are used in the tested component
      declarations: [DashboardComponent, FilterUsersPipe],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      // with the stub service, will define here that we use firebase service but we our provided values
      // USE THIS INSTEAD OF THE FOLLOWING, if USING serviceStub
      // providers: [{provide: FirestoreService, useValue: serviceStub}]

      // we declare the firebase service as the provider instead of serviceStub if we want to use the actual service
      providers: [FirestoreService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // we declare this if we don't use the stub service, spy will listen for the declared service, in our case FirestoreService,
    // and the method getAllUsersFromFirestore
    service = de.injector.get(FirestoreService);

    // this will use the values returned by firebase
    // spy = spyOn(service, 'getAllUsersFromFirestore');

    // this will use the service, but use dummy data, the DIFFERENCE between this and stub is that with the spy implementation we can
    // test the service functioning (is declared, number of calls, etc)
    spy = spyOn(service, 'getAllUsersFromFirestore').and.returnValue(of([{
      id: 1,
      name: "asdas",
      email: "asdas",
      dateAdded: new Date().getDate()
    }]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should conatin Welcome', () => {
    expect(component.title).toContain('Welcome');
  });

  it('number of users should be at least 2', () => {
    expect(component.numberOfActiveUsers).toBeGreaterThanOrEqual(2);
  });

  it('button  should be named Add User', () => {
    expect(de.query(By.css('.btn-success')).nativeElement.innerHTML).toBe('Add User');
  });

  it('check toggle title', () => {
    expect(component.showTitle).toBeTruthy();
    expect(component.toggleTile());
    expect(component.showTitle).toBeFalse();
  });

  it('check async toggle title', fakeAsync(() => {
    expect(component.showTitle).toBeTruthy();
    expect(component.asyncToggleTitle());
    tick(500);
    expect(component.showTitle).toBeFalse();
  }));

  // this will work with serviceStub too
  it('should return users', () => {
    component.usersList$.subscribe(content => {
      expect(content).toBeDefined();
      expect(content.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should call service and just once', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
  });

});
