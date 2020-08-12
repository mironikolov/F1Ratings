import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MaterialModule } from './Modules/material/material.module';

import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { InfoComponent } from './user/info/info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCountryFormComponent } from './admin-panel/add-country-form/add-country-form.component';
import { TrackComponent } from './admin-panel/track/track.component';
import { AddTrackFormComponent } from './admin-panel/track/add-track-form/add-track-form.component';
import { RaceComponent } from './admin-panel/race/race.component';
import { AddRaceFormComponent } from './admin-panel/race/add-race-form/add-race-form.component';
import { DriverComponent } from './admin-panel/driver/driver.component';
import { AddDriverFormComponent } from './admin-panel/driver/add-driver-form/add-driver-form.component';
import { RaceResultComponent } from './admin-panel/race-result/race-result.component';

export function getBaseUrl(){
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    InfoComponent,
    NavbarComponent,
    AddCountryFormComponent,
    TrackComponent,
    AddTrackFormComponent,
    RaceComponent,
    AddRaceFormComponent,
    DriverComponent,
    AddDriverFormComponent,
    RaceResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: 'BASE_URL',
      useFactory: getBaseUrl
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
