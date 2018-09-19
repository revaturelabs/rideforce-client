import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RideswipeComponent } from './components/rideswipe/rideswipe.component';
import { LandingComponent } from './components/landing/landing.component';
import { UsercardComponent } from './components/usercard/usercard.component';
import { HowToComponent } from './components/how-to/how-to.component';


@NgModule({
  declarations: [
    AppComponent,
    RideswipeComponent,
    LandingComponent,
    UsercardComponent,
    HowToComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
