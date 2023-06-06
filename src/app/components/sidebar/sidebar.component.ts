import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ModulesMessengerService } from "src/app/services/modules-messenger.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  scheduleAttente = 0
  role;
  constructor(private router: Router, private dataService: DataService,
    private modulesMessengerService: ModulesMessengerService
    )
   {}

  ngOnInit() {
    this.getAppointmentEnAttente();
    this.role = localStorage.getItem('role');
    this.modulesMessengerService.getMessage().subscribe((resp:any)=>{
      if(resp.type == 'minise_schedule'){
        this.scheduleAttente = this.scheduleAttente + resp.data
      }
    })
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
  getAppointmentEnAttente(){
    this.dataService.sendGetRequest('getAppointmentEnAttente', {}).subscribe((resp: any) => {
      this.scheduleAttente = resp.data
    })
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
