import { Location } from "@angular/common";
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

  step = 1;
  dataPassed;
  constructor(private toastrNotificationService: ToastrNotificationService, 
    private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    if(localStorage.getItem('dataPassedRegister') != null){
      this.dataPassed = JSON.parse(localStorage.getItem('dataPassedRegister'));
      this.step = 2;
    }

    
  }

  goBack(){
    if(this.step == 1)
    this.location.back();
    else this.step = 1;
  }

  goForward(evt){
    this.step = evt.step;
    localStorage.setItem('dataPassedRegister', JSON.stringify(evt.data));
    this.dataPassed = evt.data;
  }

 

}
