import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  indexActive = 0;
  tabs = ['Information','Profile', 'Appointement'];
  data;
  loading = false;
  tab;
  user;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = AuthService.getUser();
    this.getData();
    
  }

  changeTab(index){
    this.indexActive = index;
    console.log(index);
    
    if(index = 0){
      this.data = undefined
      this.getData()
    }
  }

  getData(){
    this.indexActive = 0
    this.loading = true
    this.dataService.sendGetRequest('patients/'+this.user.patient.id, '').subscribe((resp: any) => {
      console.log(resp.data);
      this.data = resp.data;
      this.loading = true
    });
  }

}
