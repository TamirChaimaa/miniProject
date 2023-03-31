import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './Schedule/schedule.component';
import { SecretariesComponent } from './secretaries/secretaries.component';
import { PatientsComponent } from './patients/patients.component';
import { SecretaryFormComponent } from './secretary-form/secretary-form.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ScheduleComponent,
    SecretariesComponent,
    PatientsComponent,
    SecretaryFormComponent,
    PatientFormComponent,
    ScheduleFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule

  ]
})
export class AdminModule { }
