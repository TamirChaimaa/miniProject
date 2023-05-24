import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrNotificationService } from "src/app/services/toastr-notification.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', [
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
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  get name() {
    return this.form.get('name');
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

  save() {
    this.submitLoading = true;
    this.authService.register({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.passwordConfirmation.value
    }).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigateByUrl('/auth/login');
      this.submitLoading = false;
    }, err => {
      console.log(err);
      this.submitLoading = false;
      this.errors = err.errors;
      this.toastrNotificationService.showError(err.message, '');
    });
  }

}
