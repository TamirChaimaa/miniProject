import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrNotificationService } from "src/app/services/toastr-notification.service";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  form = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
    ]),
  });
  submitLoading = false;
  errors;
  showAlert: boolean = false;


  constructor(private toastrNotificationService: ToastrNotificationService, 
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


  }


  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }


  save() {
    this.submitLoading = true;
    this.authService.login({email: this.email.value, password: this.password.value}).
    subscribe((resp: any) => {
      console.log(resp);
      this.authService.setToken(resp.data.token)
      AuthService.setUser(resp.data.user)
      localStorage.setItem('role', resp.data.role)
      this.submitLoading = false;
      // /admin/dashboard
      if(resp.data.role == 'user'){
        this.router.navigateByUrl('/profile')
      }else{
        this.router.navigateByUrl('/admin/dashboard')
      }

    }, err => {
      console.log(err);
      this.submitLoading = false;
      this.errors = err;
      this.toastrNotificationService.showError(err, '')
    })
    
  }

}



