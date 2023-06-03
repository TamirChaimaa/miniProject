import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;
  isAuth = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('token') != null
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  async logout(){
    const result = await Swal.fire({
      title: '',
      icon: 'question',
      html:
        'Did u want to logout ?',
      showCloseButton: true,
      showCancelButton: true
    }
    );
    if(result.isConfirmed){
      localStorage.clear()
      this.router.navigateByUrl("/landing")
    }
    
  }
}
