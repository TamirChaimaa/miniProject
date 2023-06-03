import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";

// admin views


// auth views

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";

// components for views and layouts


import { ComponentsModule } from "./components/components.module";
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpRequestInterceptor } from "./interceptors/http-request.interceptor";



@NgModule({
  declarations: [
    AppComponent,

    AdminComponent,

    IndexComponent,
    LandingComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      newestOnTop: true,
      tapToDismiss: true,
      autoDismiss: true,
      maxOpened: 4,
      timeOut: 
      2000
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
