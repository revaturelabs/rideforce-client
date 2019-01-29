import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthService } from '../app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { CallbackComponent } from './callback/callback/callback.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FirstModule } from './first/first.module';
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
    // ImageUploadComponent,
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