import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  input1: String;
  input2: String ;
  input3 : String;
  input4: String;
  showAlert: Boolean  = false 
  constructor() {}

  ngOnInit(): void {}

submitForm(){
  if (!this.input1 || !this.input2 || !this.input3 || this.input4) {
    this.showAlert = true;
  }
    else {
      this.showAlert = false;
    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}
