import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { RideswipeComponent } from './components/rideswipe/rideswipe.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { UsercardComponent } from './components/usercard/usercard.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UsermatchwebComponent } from './components/usermatchweb/usermatchweb.component';

@NgModule({
  declarations: [
    AppComponent,
    RideswipeComponent,
    LandingComponent,
    UsercardComponent,
    HowToComponent,
    MapComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    UsermatchwebComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM55oeuc0jODU5BQB-UF7KJLDLKC6j3pE'
    }),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
