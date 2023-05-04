import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views


// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts


import { ComponentsModule } from "./components/components.module";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequestInterceptor } from "./interceptors/http-request.interceptor";



@NgModule({
  declarations: [
    AppComponent,

    AdminComponent,

    IndexComponent,
    LandingComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      newestOnTop: true,
      tapToDismiss: true,
      autoDismiss: true,
      maxOpened: 4,
      timeOut: 100000
    }),
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
