import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBarChartComponent } from './cards/card-bar-chart/card-bar-chart.component';
import { CardLineChartComponent } from './cards/card-line-chart/card-line-chart.component';
import { IndexDropdownComponent } from './dropdowns/index-dropdown/index-dropdown.component';
import { PagesDropdownComponent } from './dropdowns/pages-dropdown/pages-dropdown.component';
import { TableDropdownComponent } from './dropdowns/table-dropdown/table-dropdown.component';
import { NotificationDropdownComponent } from './dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from './dropdowns/user-dropdown/user-dropdown.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footers/footer/footer.component';
import { FooterSmallComponent } from './footers/footer-small/footer-small.component';
import { FooterAdminComponent } from './footers/footer-admin/footer-admin.component';
import { CardPageVisitsComponent } from './cards/card-page-visits/card-page-visits.component';
import { CardProfileComponent } from './cards/card-profile/card-profile.component';
import { CardSocialTrafficComponent } from './cards/card-social-traffic/card-social-traffic.component';
import { CardStatsComponent } from './cards/card-stats/card-stats.component';
import { CardTableComponent } from './cards/card-table/card-table.component';
import { HeaderStatsComponent } from './headers/header-stats/header-stats.component';
import { AuthNavbarComponent } from './navbars/auth-navbar/auth-navbar.component';
import { AdminNavbarComponent } from './navbars/admin-navbar/admin-navbar.component';
import { IndexNavbarComponent } from './navbars/index-navbar/index-navbar.component';
import { CardScheduleFormComponent } from './cards/card-schedule-form/card-schedule-form.component';
import { CardSecretaryFormComponent } from './cards/card-secretary-form/card-secretary-form.component';
import { CardPatientFormComponent } from './cards/card-patient-form/card-patient-form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    CardScheduleFormComponent,
    CardSecretaryFormComponent,
    CardPatientFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    CardScheduleFormComponent,
    CardSecretaryFormComponent,
    CardPatientFormComponent
  ]
})
export class ComponentsModule { }
