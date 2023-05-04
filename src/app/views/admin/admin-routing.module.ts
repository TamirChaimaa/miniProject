import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentFormComponent } from './documents/document-form/document-form.component';
import { DocumentsComponent } from './documents/documents.component';
import { PatientFormComponent } from './patients/patient-form/patient-form.component';
import { PatientsComponent } from './patients/patients.component';
import { ScheduleFormComponent } from './Schedule/schedule-form/schedule-form.component';
import { ScheduleComponent } from './Schedule/schedule.component';
import { SecretariesComponent } from './secretaries/secretaries.component';
import { SecretaryFormComponent } from './secretaries/secretary-form/secretary-form.component';

const routes: Routes = [
  { 
    path: '',
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "secritaries", component: SecretariesComponent },
      { path: "patients", component: PatientsComponent },
      { path: "schedule", component: ScheduleComponent },
      { path: "secritaries/secretaryForm", component: SecretaryFormComponent },
      { path: "patients/patientForm", component: PatientFormComponent },
      { path: "schedule/scheduleForm", component: ScheduleFormComponent },
      { path: "documents", component: DocumentsComponent },
      { path: "documents/documentForm", component: DocumentFormComponent },
    ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
