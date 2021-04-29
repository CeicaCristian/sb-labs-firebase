import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from 'src/environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterUsersPipe} from './pipes/filter-users.pipe';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from "./services/auth-guard.service";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {LoadingComponent} from './loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    FilterUsersPipe,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
