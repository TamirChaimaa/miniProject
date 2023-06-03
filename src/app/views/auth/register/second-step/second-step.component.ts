import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnChanges {
  @Input() dataPassed;
  submitLoading = false;
  formData: FormData; 
  errors;
  cinImage = {
    file: null,
    fileName: '',
  };
  form = new UntypedFormGroup({
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
    ]),
    age: new UntypedFormControl('', [
      Validators.required,
    ]),
    adress: new UntypedFormControl('', [
      Validators.required,
    ]),
    cin: new UntypedFormControl('', [
      Validators.required,
    ])
  }); 


  constructor(private toastrNotificationService: ToastrNotificationService, 
    private authService: AuthService, private router: Router, private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.dataPassed && changes['dataPassed']){
      }
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get age() {
    return this.form.get('age');
  }


  get Adress() {
    return this.form.get('adress');
  }
  
  get Cin() {
    return this.form.get('cin');
  }
  
  importCin(evt: any){
    const image = evt.target.files[0];
    this.cinImage.file = image;
    this.cinImage.fileName = image.name;
    console.log(this.cinImage);
    
  }

  setFormData(){
    this.formData =  new FormData();
    console.log(this.dataPassed);

    this.formData.append('name', this.dataPassed.name);
    this.formData.append('FullName', this.dataPassed.name);
    this.formData.append('email', this.dataPassed.email);
    this.formData.append('Password', this.dataPassed.Password);
    this.formData.append('phoneNumber', this.dataPassed.phoneNumber);
    this.formData.append('DateOfBirth', this.dataPassed.DateOfBirth);
    this.formData.append('Password_Confirmation', this.dataPassed.Password_Confirmation);

    this.formData.append('age', this.age.value);
    this.formData.append('Adress', this.Adress.value);
    this.formData.append('cin', this.Cin.value);
    this.formData.append('cin_image', this.cinImage.file, 'cin')
  }



  async save() {
    try {
      console.log(this.dataPassed);
      this.submitLoading = true;
      if(this.cinImage.fileName.length) {
        await this.checkIntegrity();
      }
      this.setFormData();
      this.authService.continueRegister(this.formData, true).subscribe((resp: any) => {
        console.log(resp);
        localStorage.removeItem('dataPassedRegister')
        this.router.navigateByUrl('/auth/login');
        this.submitLoading = false;
      }, err => {
        console.log(err);
        this.submitLoading = false;
        this.errors = err.errors;
        this.toastrNotificationService.showError(err.message, '');
      });
    } catch (error) {
      this.submitLoading = false
      this.toastrNotificationService.showError(error, '');
      this.errors = {
        Cin_image : [error]
      }
    }

  }

  async checkIntegrity(){
    const imageFormData = new FormData();
    imageFormData.append('cin_image', this.cinImage.file, this.cinImage.fileName);
    return new Promise((resolve, reject) => {
      this.globalService.checkCinImage('getCin/', imageFormData).subscribe((resp: any) => {
        if(resp.data == this.Cin.value ){
          resolve(true)
        }else{
          reject('your infotmation not integred with your cin image');
        }
      }, err => {
        reject(err);
      })
    });
  
  }


  
}
