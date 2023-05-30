import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor(private router: Router) {}

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
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
