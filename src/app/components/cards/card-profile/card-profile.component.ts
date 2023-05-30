import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-card-profile",
  templateUrl: "./card-profile.component.html",
})
export class CardProfileComponent implements OnInit {
  patient;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((resp: any) => {
      this.patient = JSON.parse(resp.patient);
      console.log(this.patient);
      
    })
  }
}
