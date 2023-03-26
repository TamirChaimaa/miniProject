import { Component, OnInit,Input } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
})
export class CardSettingsComponent implements OnInit {
  private _color = "light";
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
 

  constructor( private router: Router) {
    
        
  }
  allerVersPage2() {
    this.router.navigate(['/admin/nouveauchemin']);
  }
 


  ngOnInit(): void {}
}
