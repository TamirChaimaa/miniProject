import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { GlobalService } from "src/app/services/global.service";
import { ToastrNotificationService } from "src/app/services/toastr-notification.service";
import { DOMAIN_URL } from "src/common/constants";
import Swal from "sweetalert2";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit, OnChanges {
  @Input() headers;
  @Input() createUrl;
  @Input() isSearchBar = true;
  @Input() getUrl;
  @Output() searchEvent = new EventEmitter();
  @Output() changeStatusEvent = new EventEmitter();

  buttons = []
  @Input() title = '';
  queries = {
    cin: '',
    skip: 0,
    take: 5,
  }
  pagination = {
    current: 1,
    totalPage: 0,
    totalElm: 0
  }
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  skeletonLoading = {
    isLoadingData: false,
    rows: Array(6).fill(0),
    cols: []
  }
  @Input() dataPassing;
  data;

  realData = [];
  private _color = "light";

  constructor(private dataService: DataService,
    private toastrNotificationService: ToastrNotificationService,
    private router: Router,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.initButtons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getUrl'] && this.getUrl) {
      this.initData();
      this.skeletonLoading.isLoadingData = true
    }
    if (changes['dataPassing'] && this.dataPassing) {
      this.skeletonLoading.isLoadingData = false
      this.realData = [];
      this.data = []
      this.dataPassing.forEach(element => {
        if (this.getUrl == 'appointments') {
          this.realData.push({
            id: element.id,
            start_time: element.attributes.start_time,
            end_time: element.attributes.end_time,
            status: element.attributes.status,
            patientId: element.relationships.id,
            created_at: element.attributes.created_at
          })
          this.data.push([element.id, element.relationships.CIN, element.relationships['patient name'],
          element.attributes.start_time, element.attributes.end_time, element.attributes.status
            , element.attributes.created_at])
        }
      })
    }
  }

  initButtons() {
    this.buttons.push({
      icon: 'fas fa-eye',
      style: 'bg-emerald-500',
      type: 'show'
    }, {
      icon: 'fas fa-trash',
      style: 'bg-yellow-500',
      type: 'remove',
      selected: false
    }, {
      icon: 'fas fa-edit',
      style: 'bg-red-500  hover:bg-emerald-500',
      type: 'edit'
    }
    )

    if(this.getUrl == 'appointments'){
      this.buttons.pop();
      this.buttons.unshift({
        icon: 'fas fa-download',
        style: 'bg-red-800',
        type: 'download'
      })
    }

  }
  initData() {
    this.skeletonLoading.isLoadingData = true
    this.realData = [];
    this.data = [];
    if (this.getUrl == "secritaries") {
      this.skeletonLoading.cols = Array(7).fill(0);
      this.getData();

    } else if (this.getUrl == "patients") {
      this.skeletonLoading.cols = Array(7).fill(0);
      this.getData();
    } else if (this.getUrl == "documents") {
      this.getData()
    } else if (this.getUrl == "appointments") {
      this.skeletonLoading.cols = Array(8).fill(0);
    } else {
      this.data = [];
    }
  }

  getData() {
    this.dataService.sendGetRequest(this.getUrl, { ...this.queries }).subscribe((resp: any) => {
      resp.data.forEach(element => {
        if (this.getUrl == 'patients') {
          this.realData.push({
            id: element.id,
            cin: element.attributes.CIN,
            fullname: element.attributes.FullName,
            age: element.attributes.Age,
            phoneNumber: element.attributes.PhoneNumber,
            dateOfBirth: element.attributes.DateOfBirth,
            adresse: element.attributes.Adress
          })
          this.data.push([element.id, element.attributes.CIN, element.attributes.FullName, element.attributes.Age,
          element.appointments == 'null' ? 'undefined' : element.appointments.attributes.start_time + ' - ' + element.appointments.attributes.end_time
            , element.attributes.created_at])
        }
        if (this.getUrl == 'secritaries') {

          this.realData.push({
            id: element.id,
            cin: element.cin,
            fullname: element.name,
            email: element.email,
          })
          this.data.push([element.id, element.cin, element.name, element.email, element.created_at])
        }

      });
      console.log(resp.total / this.queries.take);

      this.pagination.totalPage = Math.round(resp.total / this.queries.take);
      this.pagination.totalElm = resp.total;
      console.log(this.pagination.current);

      this.skeletonLoading.isLoadingData = false

    }, err => {
      this.skeletonLoading.isLoadingData = false

    })

  }

  cickAction(btn, id, index?) {
    if (btn.type == 'remove') {
      const removeIcom = document.getElementsByClassName('removeId' + id)[0].classList;
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'Did you want to remove this ' + this.getUrl + ' of ' + id + ' ?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then((response: any) => {

        if (response.isConfirmed) {
          // loading remove button

          // this.buttons[1].icon = 'fas fa-fan fa-spin'
          removeIcom.remove('fa-trash')
          removeIcom.add('fa-fan', 'fa-spin');
          this.dataService.sendDeleteRequest(this.getUrl + '/' + id).subscribe((resp: any) => {
            console.log('remove', resp);
            removeIcom.remove('fa-fan', 'fa-spin')
            removeIcom.add('fa-trash')
            this.toastrNotificationService.showSuccess('Remove Success', '');
            this.initData();
          }, err => {
            removeIcom.remove('fa-fan', 'fa-spin')
            removeIcom.add('fa-trash')
          })
        } else {
          removeIcom.remove('fa-fan', 'fa-spin')
          removeIcom.add('fa-trash')
        }
      });
    }

    if (btn.type == 'edit') {
      if (this.getUrl == 'patients' || this.getUrl == 'secritaries') {
        const single = this.getUrl == 'patients' ? 'patient' : 'secretary';
        console.log(this.realData[index]);

        this.router.navigateByUrl(`admin/${this.getUrl}/${single}Form?${single}=` + JSON.stringify(this.realData[index]));
      } else
        this.router.navigateByUrl('admin/schedule/scheduleForm?apnt=' + JSON.stringify(this.realData[index]))
    }

    if (btn.type == 'show') {
      if (this.getUrl == 'patients') {
        this.router.navigateByUrl('admin/patients/profile?patient=' + JSON.stringify(this.realData[index]));
      }
    }

    if (btn.type == 'download') {
      if (this.getUrl == 'appointments') {        
        this.dataService.sendGetRequest(`patient/${this.realData[index]['patientId']}/report-pdf`, { }).subscribe((resp: any) => {
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

  }




  search(query?) {

    if (this.getUrl == 'patients' || this.getUrl == 'secritaries') {
      this.queries['cin'] = query
      this.initData();
    }
    if (this.getUrl == 'appointments') {
      this.searchEvent.emit(query);
      this.data = [];
      this.realData = [];
      this.skeletonLoading.cols = Array(8).fill(0);
      this.skeletonLoading.isLoadingData = true
    }
  }

  setAppointement(ind: number) {
    console.log(this.realData[ind]);

    this.router.navigateByUrl('/admin/schedule/scheduleForm?cin=' + this.realData[ind].cin)

  }




  getArray() {

    return Array.from({ length: this.pagination.totalPage }, (_, index) => index + 1);

  }

  test(d) {
    console.log(d);

  }

}
