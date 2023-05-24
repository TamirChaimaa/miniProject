import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-card-patient-form',
  templateUrl: './card-patient-form.component.html',

})
export class CardPatientFormComponent {
  patientId: any;
  form = new UntypedFormGroup({
    fullname: new UntypedFormControl('', [
      Validators.required,
    ]),
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
    ]),
    age: new UntypedFormControl('', [
      Validators.required,
    ]),
    dateOfBirth: new UntypedFormControl('', [
      Validators.required,
    ]),
    cin: new UntypedFormControl('', [
      Validators.required,
    ]),
    adresse: new UntypedFormControl('', [
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
    private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((resp: any) => {
      console.log(JSON.parse(resp.patient));
      this.patientId = JSON.parse(resp.patient).id
      this.form.patchValue(JSON.parse(resp.patient))
    })
  }

  get fullname() {
    return this.form.get('fullname');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get age() {
    return this.form.get('age');
  }

  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }

  get cin() {
    return this.form.get('cin');
  }

  get adresse() {
    return this.form.get('adresse');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirmation() {
    return this.form.get('passwordConfirmation');
  }

  get data() {
    const res = {
      FullName: this.fullname.value,
      PhoneNumber: this.phoneNumber.value,
      Age: this.age.value,
      DateOfBirth: this.dateOfBirth.value,
      CIN: this.cin.value,
      Adress: this.adresse.value,
    }
    if(this.password.value && this.password.value.length){
      res['Password'] = this.password.value; 
      res['Password_Confirmation'] = this.passwordConfirmation.value; 
    }

    return res;
  }

  save() {
    this.submitLoading = true;
    let request = {
      url: 'patients',
      method: this.patientId ? 'put' : 'post',
      message: 'Modification Success' ? 'put' : 'Added success'
    }
    if (this.patientId) request.url += '/' + this.patientId;
    this.dataService.sendRequest(request.method == 'put' ? 'put' : 'post', request.url, this.data).subscribe((resp: any) => {
      console.log(resp);
      this.toastrNotificationService.showSuccess(request.message, '')
      this.router.navigateByUrl('admin/patients')
      this.submitLoading = false;
    }, err => {
      console.log(err);
      this.submitLoading = false;
      this.errors = err.errors;
      this.toastrNotificationService.showError(err.message, '');
    });
  }
}
