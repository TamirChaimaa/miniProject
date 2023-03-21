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
  constructor() {}

  ngOnInit(): void {}
}
