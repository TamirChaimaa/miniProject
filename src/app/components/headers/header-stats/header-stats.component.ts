import { Component, OnInit } from "@angular/core";

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
  cardsStates = [{
    statSubtitle: 'Number Of Patients',
    statTitle: '10',
    statPercentColor:"text-emerald-500",
    statIconName:"fas fa-address-card",
    statIconColor:"bg-yellow-500"
  },
  {
    statSubtitle: 'Number Of Secretaries',
    statTitle: '2',
    statPercentColor:"text-red-500",
    statIconName:"fas fa-users",
    statIconColor:"bg-red-500"
  },
  {
    statSubtitle: 'Number of Rdv',
    statTitle: '4',
    statPercentColor:"text-orange-500",
    statIconName:"fas fa-notes-medical",
    statIconColor:"bg-indigo-500"
  }
]
  constructor() {}
  ngOnInit(): void {}


}
