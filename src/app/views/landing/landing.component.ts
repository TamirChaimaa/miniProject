import { Component, OnInit,ViewChild,ElementRef,HostListener } from "@angular/core";

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
  @ViewChild('div1') div1:ElementRef ;
  @ViewChild('div2') div2:ElementRef ;
   isExpanded : boolean= false;
   @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const div1Position = this.div1.nativeElement.offsetTop;
    const div2Position = this.div2.nativeElement.offsetTop;
    const viewportHeight = window.innerHeight;

    if (div1Position > viewportHeight && div2Position < viewportHeight) {
      // Swap positions
      this.div1.nativeElement.style.order = '2';
      this.div2.nativeElement.style.order = '1';
    } else if (div2Position > viewportHeight && div1Position < viewportHeight) {
      // Swap positions
      this.div1.nativeElement.style.order = '1';
      this.div2.nativeElement.style.order = '2';
    }
  }
   
  constructor() {}

  ngOnInit(): void {}
  expandDiv() {
    this.isExpanded = true;
  }

  collapseDiv() {
    this.isExpanded = false;
  }
}
