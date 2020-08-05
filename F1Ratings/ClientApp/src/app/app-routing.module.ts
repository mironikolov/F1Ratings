import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { InfoComponent } from './user/info/info.component';
import { AddCountryFormComponent } from './admin-panel/add-country-form/add-country-form.component';
import { TrackComponent } from './admin-panel/track/track.component';

const routes: Routes = [
  { path: 'user', component: UserComponent, children: [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'info', component: InfoComponent, canActivate: [AuthGuard]}
  ]},
  { path: 'home', component: HomeComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'adminpanel', component: AdminPanelComponent, canActivate:[AuthGuard], data: { permittedRoles: ['Admin'] }, children: [
    { path: 'addcountry', component: AddCountryFormComponent },
    { path: 'track', component: TrackComponent}
  ] },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
