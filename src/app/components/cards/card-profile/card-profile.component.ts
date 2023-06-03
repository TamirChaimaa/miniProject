import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-card-profile",
  templateUrl: "./card-profile.component.html",
})
export class CardProfileComponent implements OnInit {
  patient;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((resp: any) => {
      this.patient = JSON.parse(resp.patient)
      this.getData();
    });
  }

  indexActive = 0;
  tabs = ['Information','Profile', 'Appointement'];
  data;
  loading = false;
  tab

  getData(){
    this.loading = true
    this.dataService.sendGetRequest('patients/'+this.patient.id, '').subscribe((resp: any) => {
      console.log(resp.data);
      this.data = resp.data;
      this.loading = true
    });
  }

  save(){
    
  }
}
