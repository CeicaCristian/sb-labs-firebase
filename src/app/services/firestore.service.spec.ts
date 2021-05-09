import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";

describe('FirestoreService', () => {
  let service: FirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)]
    });
    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
