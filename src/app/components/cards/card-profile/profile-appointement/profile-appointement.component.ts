import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModulesMessengerService } from 'src/app/services/modules-messenger.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { DOMAIN_URL } from 'src/common/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-appointement',
  templateUrl: './profile-appointement.component.html',
  styleUrls: ['./profile-appointement.component.scss']
})
export class ProfileAppointementComponent implements OnInit, OnChanges {
  @Input() appointemnts;
  @Output() goToForm = new EventEmitter();
  headers = [
    {
      name: "ID",
      title: "id",
    },
    {
      name: "start_time",
      title: "start_time ",
    },
    {
      name: "end_time",
      title: "end_time ",

    },

     {
      name: "status",
      title: "status",
      type: 'status'
    },
    {
      name: "document",
      title: "document",
    },
  ];

  constructor(private dataService: DataService, private toastrNotificationService: ToastrNotificationService,
    private modulesMessengerService: ModulesMessengerService
    ) {}


  ngOnInit(): void {
      
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.appointemnts && changes['appointemnts']){
        console.log(this.appointemnts);
        
      }
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
        this.dataService.sendPutRequest('appointments' + '/' + apnt.id + '/changeStatus', 
        {currentStatus: statusClicked}).subscribe((resp: any) => {
          apnt.status = resp.data.attributes.status;
          this.modulesMessengerService.sendMessage({type:'minise_schedule', data: -1});
          this.toastrNotificationService.showSuccess('change status Success', '')
        }, err => {
        })
      }
    });
  }


  download(patientId){
    this.dataService.sendGetRequest(`patient/${patientId}/report-pdf`, { }).subscribe((resp: any) => {
      const downloadPDF = (url: string): void => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';            
        link.click();
      };
      const pdfUrl = DOMAIN_URL + '/storage/pdfs/' +  resp.data.pdf_url;
      downloadPDF(pdfUrl);
    });
  }
}
