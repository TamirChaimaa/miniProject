import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileFormsComponent } from '../../components/cards/card-profile/profile-forms/profile-forms.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    ProfileComponent,

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
