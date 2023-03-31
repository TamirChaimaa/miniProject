import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientsComponent } from './patients/patients.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { ScheduleComponent } from './Schedule/schedule.component';
import { SecretariesComponent } from './secretaries/secretaries.component';
import { SecretaryFormComponent } from './secretary-form/secretary-form.component';

const routes: Routes = [
  { 
    path: '',
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "secritaries", component: SecretariesComponent },
      { path: "patients", component: PatientsComponent },
      { path: "schedule", component: ScheduleComponent },
      { path: "secretaryForm", component: SecretaryFormComponent },
      { path: "patientForm", component: PatientFormComponent },
      { path: "scheduleForm", component: ScheduleFormComponent },
    ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
