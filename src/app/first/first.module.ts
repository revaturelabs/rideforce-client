import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from '../app.component';
import { RideswipeComponent } from '../components/rideswipe/rideswipe.component';
import { LandingComponent } from '../components/landing/landing.component';
import { LoginComponent } from '../components/login/login.component';
import { UsercardComponent } from '../components/usercard/usercard.component';
import { HowToComponent } from '../components/how-to/how-to.component';
import { MapComponent } from '../components/map/map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, CircleManager } from '@agm/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { LikesComponent } from '../components/likes/likes.component';
import { UsermatchwebComponent } from '../components/usermatchweb/usermatchweb.component';
import { LikesmatchwebComponent } from '../components/likesmatchweb/likesmatchweb.component';
import { UserControllerService } from '../services/api/user-controller.service';
import { MapsControllerService } from '../services/api/maps-controller.service';
import { MatchingControllerService } from '../services/api/matching-controller.service';
import { AuthService } from '../../app/services/auth.service';
import { HttpClientModule, HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlacesAutocompleteDirective } from '../directives/places-autocomplete/places-autocomplete.directive';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { AccountinfoComponent } from '../components/accountinfo/accountinfo.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { JwtInterceptor } from '../utils/jwt.interceptor';
import { ErrorInterceptor } from '../utils/error.interceptor';
import { AdminComponent } from '../components/admin/admin.component';
import { CarRegistrationComponent } from '../components/car-registration/car-registration.component';
import { ViewProfileComponent } from '../components/view-profile/view-profile.component';
import { CallbackComponent } from '../callback/callback/callback.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewUsersComponent } from '../components/view-users/view-users.component';
import { SearchUsersComponent } from '../components/search-users/search-users.component';

@NgModule({
  declarations: [
    RideswipeComponent,
    UsercardComponent,
    HowToComponent,
    MapComponent,
    LikesComponent,
    UsermatchwebComponent,
    LikesmatchwebComponent,
    PlacesAutocompleteDirective,
    FavoritesComponent,
    AccountinfoComponent,
    AdminComponent,
    CarRegistrationComponent,
    ViewProfileComponent,
    SearchUsersComponent,
    ViewUsersComponent
    // DateFormatPipe,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    AnimateOnScrollModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxGFZzCVmm1PxV8C0KvG6EG6Tt3S_HeXw',
      libraries: ['places'],
    }),
    NgbModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxSpinnerModule
  ],
  providers: [
    NgbActiveModal,
    MapsControllerService,
    UserControllerService,
    // AuthService,
    MatchingControllerService,
    GoogleMapsAPIWrapper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [LoginComponent]
})
export class FirstModule { }
