import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
    ]),
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
    ]),
    dateOfBirth: new UntypedFormControl('', [
      Validators.required,
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
    ]),
    passwordConfirmation: new UntypedFormControl('', [
      Validators.required,
    ]),
  });
  submitLoading = false;
  errors;
  showAlert: boolean = false;

  constructor(private toastrNotificationService: ToastrNotificationService, 
    private authService: AuthService) { }

  ngOnInit(): void {

  }

  get name() {
    return this.form.get('name');
  }

  get DateOfBirth() {
    return this.form.get('dateOfBirth');
  }

  get PhoneNumber() {
    return this.form.get('phoneNumber');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirmation() {
    return this.form.get('passwordConfirmation');
  }


  get data(){
   return  {
      name: this.name.value,
      email: this.email.value,
      Password: this.password.value,
      DateOfBirth: this.DateOfBirth.value,
      Password_Confirmation: this.passwordConfirmation.value,
      phoneNumber: this.PhoneNumber.value,
      step: 1
    }
  }

  next() {    
    this.submitLoading = true;
    this.authService.registerPatient(this.data).subscribe((resp: any) => {
      console.log(resp);
      this.nextStep.emit({
        step: 2,
        data: this.data
      });
      this.submitLoading = false;
    }, err => {
      console.log(err);
      this.submitLoading = false;
      this.errors = err.errors;
      this.toastrNotificationService.showError(err.message, '');
    });
  }
}
