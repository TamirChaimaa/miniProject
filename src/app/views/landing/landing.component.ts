import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styles: [`
 
  .my-div:hover {
    transform: scale(1.2);
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.4);
    background-color: white;
  }

  .my-title{
  overflow: hidden;
  white-space: nowrap;
  animation: type 4s steps(50) infinite;
  }
  @keyframes type {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
app-footer{
  margin : 200px ;
}
`]

})
export class LandingComponent implements OnInit {
   isExpanded : boolean= false;

  constructor() {}

  ngOnInit(): void {}
  expandDiv() {
    this.isExpanded = true;
  }

  collapseDiv() {
    this.isExpanded = false;
  }
}
