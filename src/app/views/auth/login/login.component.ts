import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ToastrNotificationService } from "src/app/services/toastr-notification.service";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  input1: String;
  input2: String;
  showAlert: boolean = false;


  constructor(private toastrNotificationService: ToastrNotificationService) { }

  ngOnInit(): void {


  }


  submitForm() {
    this.toastrNotificationService.showError('Oops, Your email or password  is incorrect', '')
  }

}



