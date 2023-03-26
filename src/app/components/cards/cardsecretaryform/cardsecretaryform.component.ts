import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardsecretaryform',
  templateUrl: './cardsecretaryform.component.html',
})
export class CardsecretaryformComponent {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";


  constructor( private router: Router) {
    
      
    
  }

 

}

