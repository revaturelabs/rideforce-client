import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HowToComponent } from '../components/how-to/how-to.component';
import { LandingComponent } from '../components/landing/landing.component';
import { LoginComponent } from '../components/login/login.component';
import { ViewProfileComponent } from '../components/view-profile/view-profile.component';
import { ViewUsersComponent } from '../components/view-users/view-users.component';
import { RegisterComponent } from '../components/register/register.component';
import { UsermatchwebComponent } from '../components/usermatchweb/usermatchweb.component';



/**
 * This is where we set our routerLink attribute.
 * For example...
 * <a class="dropdown-item" routerLink="/howTo">About</a>
 * creates an <a> element of class "dropdown-item" that will
 * refer to these routes to find which component to route to.
 */
export const routes: Routes = [
  { path: '',  component: LandingComponent},
  { path: 'howTo', component: HowToComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'userProfile', component: ViewProfileComponent},
  { path: 'rideswipe', component: UsermatchwebComponent},
  { path: 'viewUsers', component: ViewUsersComponent}
  // { path: 'logout', redirectTo: 'landing' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
