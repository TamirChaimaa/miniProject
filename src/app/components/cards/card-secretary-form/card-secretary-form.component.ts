import { Component,Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-card-secretary-form',
  templateUrl: './card-secretary-form.component.html',
})
export class CardSecretaryFormComponent {
  secritaryId: any;
  form = new UntypedFormGroup({
    fullname: new UntypedFormControl('', [
      Validators.required,
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
    ]),
    cin: new UntypedFormControl('', [
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
      if(resp.secretary){
      this.secritaryId = JSON.parse(resp.secretary).id
      console.log(JSON.parse(resp.secretary));
      
      this.form.patchValue(JSON.parse(resp.secretary))
      }

    })
  }

  get fullname() {
    return this.form.get('fullname');
  }


  get cin() {
    return this.form.get('cin');
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

  get data() {
    const res = {
      name: this.fullname.value,
      email: this.email.value,
      cin: this.cin.value,
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
      url: 'secritaries',
      method: this.secritaryId ? 'put' : 'post',
      message: 'Modification Success' ? 'put' : 'Added success'
    }
    if (this.secritaryId) request.url += '/' + this.secritaryId;

    this.dataService.sendRequest(request.method == 'put' ? 'put' : 'post', request.url, this.data).subscribe((resp: any) => {
      console.log(resp);
      this.toastrNotificationService.showSuccess(request.message, '')
      this.router.navigateByUrl('admin/secritaries')
      this.submitLoading = false;
    }, err => {
      this.submitLoading = false;
      this.errors = err.errors;
      console.log(this.errors);

      this.toastrNotificationService.showError(err.message, '');
    });
  }
 

}

