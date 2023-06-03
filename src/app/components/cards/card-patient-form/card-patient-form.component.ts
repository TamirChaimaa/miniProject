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
  cinImage = {
    file: undefined,
    fileName: undefined
  }
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
    cinImg: new UntypedFormControl('', [
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
    ], 
    
    
    
    ),
  });
  submitLoading = false;
  errors;
  showAlert: boolean = false;

  constructor(private toastrNotificationService: ToastrNotificationService,
    private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((resp: any) => {
      if(!resp.patient) return;
      console.log(JSON.parse(resp.patient));
      this.patientId = JSON.parse(resp.patient).cin
      this.form.patchValue(JSON.parse(resp.patient))
      console.log(JSON.parse(resp.patient).cin_image);
      
      this.form.get('cinImg').setValue(JSON.parse(resp.patient).cin_image)
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

  get email() {
    return this.form.get('email');
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


  
  importCin(evt: any){
    const image = evt.target.files[0];
    this.cinImage.file = image;
    this.cinImage.fileName = image.name;
    
  }



  
  getFormData(){
    const formData =  new FormData();
    formData.append('FullName', this.fullname.value);
    formData.append('PhoneNumber', this.phoneNumber.value);
    formData.append('Age', this.age.value);
    formData.append('CIN', this.cin.value);
    formData.append('Adress', this.adresse.value);
    formData.append('Email', this.email.value);
    formData.append('DateOfBirth', this.dateOfBirth.value);
    if(this.cinImage.file)
    formData.append('cin_image', this.cinImage.file, 'cin');
    if(this.password.value && this.password.value.length){
      formData.append('Password', this.password.value); 
      formData.append('Password_Confirmation', this.passwordConfirmation.value); 
    }
    return formData
  }


  save() {
    this.submitLoading = true;
    let request = {
      url: 'patients',
      method: this.patientId ? 'put' : 'post',
      message: 'Modification Success' ? 'put' : 'Added success'
    }
    if (this.patientId) request.url += '/' + this.patientId;
    this.dataService.sendPostRequest(request.url, this.getFormData(), true).subscribe((resp: any) => {
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
