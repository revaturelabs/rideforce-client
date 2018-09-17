import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RideswipeComponent } from './components/rideswipe/rideswipe.component';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    RideswipeComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
