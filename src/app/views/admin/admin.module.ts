import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './Schedule/schedule.component';
import { SecretariesComponent } from './secretaries/secretaries.component';
import { PatientsComponent } from './patients/patients.component';
import { SecretaryFormComponent } from './secretaries/secretary-form/secretary-form.component';
import { PatientFormComponent } from './patients/patient-form/patient-form.component';
import { ScheduleFormComponent } from './Schedule/schedule-form/schedule-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentFormComponent } from './documents/document-form/document-form.component';
import { ScheduleSchemaComponent } from './Schedule/schedule-schema/schedule-schema.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleTableComponent } from './Schedule/schedule-table/schedule-table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ScheduleComponent,
    SecretariesComponent,
    PatientsComponent,
    SecretaryFormComponent,
    PatientFormComponent,
    ScheduleFormComponent,
    DocumentsComponent,
    DocumentFormComponent,
    ScheduleSchemaComponent,
    ScheduleTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
