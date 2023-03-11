import { Component,ElementRef,OnInit,ViewChild} from "@angular/core";
import { NgForm } from '@angular/forms';



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  input1: String;
  input2: String ;
  showAlert: boolean = false;
  
   
  constructor( private elementRef : ElementRef) {}

  ngOnInit(): void {
    
    
  }
 

  submitForm() {
    if (!this.input1 || !this.input2) {
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
  


