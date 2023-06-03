import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ModulesMessengerService } from "src/app/services/modules-messenger.service";
import { ToastrNotificationService } from "src/app/services/toastr-notification.service";
import { Appointement } from "src/common/models/Appointement";
import Swal from "sweetalert2";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
})
export class ScheduleComponent implements OnInit {
dataLoading;
data;
type =  'table'
constructor(
  private modulesMessengerService: ModulesMessengerService,
  private dataService: DataService,
  private toastrNotificationService: ToastrNotificationService,
  private router: Router) { }

  ngOnInit(): void {
    this.modulesMessengerService.sendMessage({ type: 'header-title', data: 'Schedule' });
    this.init()
  }

  init(){
    this.getData('')
  }
  getData(query) {
    this.dataLoading = true;
    this.dataService.sendGetRequest('appointments', {cinSearchQuery: query }).subscribe((resp: any) => {
      this.data = resp.data
      this.dataLoading = false;

    });
  }

 




  changeStatus(apnt){
    Swal.fire({
      icon: 'info',
      title: '',
      text: 'Did you want to accept this appointment to pass ?',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Accept',
      denyButtonText: 'Refused',
      cancelButtonText: 'Cancel',
    }).then((response: any) => {
      console.log(response);
      
      if(!response.isDismissed){
        const statusClicked = response.isConfirmed ?  'waiting to pass' : 'refused';
        const d = [...this.data];
        this.dataService.sendPutRequest('appointments' + '/' + apnt.id + '/changeStatus', 
        {currentStatus: statusClicked}).subscribe((resp: any) => {
          apnt.status = resp.data.attributes.status;
          const index = this.data.findIndex(elm=> elm.id == apnt.id);
          d[index].attributes.status = resp.data.attributes.status
          this.toastrNotificationService.showSuccess('change status Success', '')
          this.data = [...d];
        }, err => {
        })
      }
    });
  }



}
