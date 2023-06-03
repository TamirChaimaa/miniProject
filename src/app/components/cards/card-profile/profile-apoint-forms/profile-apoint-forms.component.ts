import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-apoint-forms',
  templateUrl: './profile-apoint-forms.component.html',
  styleUrls: ['./profile-apoint-forms.component.scss']
})
export class ProfileApointFormsComponent {
  @Input() cin;
  @Output() goToForm = new EventEmitter();

}
