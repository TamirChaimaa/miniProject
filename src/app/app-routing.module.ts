import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { ScheduleComponent } from "./views/admin/Schedule/schedule.component";
import { SecretariesComponent } from "./views/admin/secretaries/secretaries.component";
import { PatientsComponent } from "./views/admin/patients/patients.component";


import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";

const routes: Routes = [
  // admin views
  {
    path: 'admin',
    loadChildren: () => import("./views/admin/admin.module").then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  // auth views
  {
    path: "auth",
    loadChildren: () => import("./views/auth/auth.module").then(m => m.AuthModule),
    canActivate: [GuestGuard]


  },
  
  { 
    path: "profile", component: ProfileComponent ,
    canActivate: [AuthGuard]
  },
  { 
    path: "landing", component: LandingComponent ,
    canActivate: [GuestGuard]
},
  { 
    path: "", component: LandingComponent,
    canActivate: [GuestGuard]
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
