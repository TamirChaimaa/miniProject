import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",

  styles: [`
  .my-div:hover {
    transform: scale(1.2);
  }
`]

})
export class HeaderStatsComponent implements OnInit {
  loadingCardStates;
  cardsStates = [{
    statSubtitle: 'Number Of Patients',
    statTitle: '',
    statPercentColor:"text-emerald-500",
    statIconName:"fas fa-address-card",
    statIconColor:"bg-yellow-500"
  },
  {
    statSubtitle: 'Number Of Secretaries',
    statTitle: '',
    statPercentColor:"text-red-500",
    statIconName:"fas fa-users",
    statIconColor:"bg-red-500"
  },
  {
    statSubtitle: 'Number of Rdv',
    statTitle: '',
    statPercentColor:"text-orange-500",
    statIconName:"fas fa-notes-medical",
    statIconColor:"bg-indigo-500"
  },
]
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getStatistic()
  }

  getStatistic(){
    this.loadingCardStates = true
    this.dataService.sendGetRequest('statistics', '').subscribe((resp: any) => {
      if(resp.data){
        this.cardsStates[0].statTitle = resp.data.patients;
        this.cardsStates[1].statTitle = resp.data.secritaries;
        this.cardsStates[2].statTitle = resp.data.appointement;
        // this.cardsStates[3].statTitle = resp.data.documents;
      }
      this.loadingCardStates = false

    }, err =>{
      this.loadingCardStates = false

    })
  }


}
