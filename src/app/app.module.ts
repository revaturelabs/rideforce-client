import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthService } from '../app/services/auth.service';
import { HttpClientModule, HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CallbackComponent } from './callback/callback/callback.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FirstModule } from './first/first.module';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { DateFormatPipe } from './pipes/date-format.pipe';

/**
 * Loads all necessary modules for the first contentful paint
 * - Team PWA
 */
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    LoginComponent,
    CallbackComponent,
    // SearchUsersComponent,
    // ViewUsersComponent,
    // DateFormatPipe,
  ],
  imports: [
    FirstModule,
    BrowserModule,
    FormsModule,
    //ReactiveFormsModule,
    AppRoutingModule,
    //BrowserAnimationsModule,
    //NgbModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
    // NgxSpinnerModule
  ],
  providers: [
    //NgbActiveModal,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }