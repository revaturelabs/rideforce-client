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
import { UserControllerService } from './services/api/user-controller.service';
import { MapsControllerService } from './services/api/maps-controller.service';
import { MatchingControllerService } from './services/api/matching-controller.service';
import { AuthService } from '../app/services/auth.service';
// import { HttpClient } from 'selenium-webdriver/http';
// import { HttpClient, HttpHandler } from '../../node_modules/@angular/common/http';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http'; 

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
      apiKey: 'APIKEY'
    }),
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MapsControllerService,
    UserControllerService,
    AuthService,
    MatchingControllerService,
    // HttpClientModule,
    // HttpClient,
    // HttpHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
