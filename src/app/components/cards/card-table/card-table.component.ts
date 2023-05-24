import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ToastrNotificationService } from "src/app/services/toastr-notification.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit, OnChanges {
  @Input() headers;
  @Input() createUrl;
  @Input() getUrl;
  buttons = []
  @Input() title = '';
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
  data;
  realData = [];
  private _color = "light";

  constructor(private dataService: DataService, 
    private toastrNotificationService: ToastrNotificationService,
    private router: Router
     ) {}

  ngOnInit(): void {
    this.initButtons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['getUrl'] && this.getUrl){
      this.initData();
    }
  }

  initButtons(){
    this.buttons.push({
      icon: 'fas fa-eye',
      style: 'bg-emerald-500',
      type: 'show'
    }, {
      icon: 'fas fa-trash',
      style: 'bg-yellow-500',
      type: 'remove'
    }, {
      icon: 'fas fa-edit',
      style: 'bg-red-500  hover:bg-emerald-500',
      type: 'edit'
    })
  }
  initData(){
    this.skeletonLoading.isLoadingData = true
    if(this.getUrl == "secritaries"){
      this.data =  [
        22,
        'tamir chaimaa',
        'H255224',
        '+212653395053',
        'Jan 23, 2023, 11:24:50 AM'
      ]
    }
    if(this.getUrl == "patients"){
      this.skeletonLoading.cols = Array(6).fill(0);

      this.getData();
      this.data =  [
        22,
        'tamir chaimaa',
        '23',
        '29/03/2023 de 8 a 8:30',
        'Jan 23, 2023, 11:24:50 AM'
      ]
    }

    if(this.getUrl == "documents"){
      this.data =  [
        22,
        'tamir chaimaa',
        '29/03/2023 de 8:30 a 9',
        'En attente',
        'Jan 23, 2023, 11:24:50 AM'
      ]
    }
    this.data = [];
  }

  getData(){
    this.dataService.sendGetRequest(this.getUrl, '').subscribe((resp: any) => {
      resp.data.forEach(element => {
        if(this.getUrl == 'patients'){
          this.realData.push({
            id: element.id, 
            fullname: element.attributes.FullName,
            age: element.attributes.Age,
            cin: element.attributes.CIN,
            phoneNumber: element.attributes.PhoneNumber,
            dateOfBirth: element.attributes.DateOfBirth,
            adresse: element.attributes.Adress
          }) 
          this.data.push([element.id, element.attributes.FullName, element.attributes.Age, '29/03/2023 de 8:30 a 9'
            , element.attributes.created_at] )
        }

      });
      console.log(resp);

      this.skeletonLoading.isLoadingData = false
      
    }, err => {
      this.skeletonLoading.isLoadingData = false

    })
    
  }

  cickAction(btn, id, index?){
    if(btn.type == 'remove'){
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'Did you want to remove this '+this.getUrl+' of ' + id + ' ?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then((response: any) => {
        if(response.isConfirmed){
          // loading remove button
          this.buttons[1].icon = 'fas fa-fan fa-spin'
          this.dataService.sendDeleteRequest(this.getUrl + '/' + id).subscribe((resp: any) => {
            console.log('remove', resp);
            this.buttons[1].icon = 'fas fa-trash'
            this.toastrNotificationService.showSuccess('Remove Success', '')
          }, err => {
            this.buttons[1].icon = 'fas fa-trash'
          })
        }
      });
    }

    if(btn.type == 'edit'){
      if(this.getUrl == 'patients'){

        this.router.navigateByUrl('admin/patients/patientForm?patient='+JSON.stringify(this.realData[index]));
      }
    }
    
  }

  search(query){
    if(this.getUrl == 'patients'){
      console.log(query);
      
    }
  }

}
