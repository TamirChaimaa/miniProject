import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-secretary-form',
  templateUrl: './card-secretary-form.component.html',
})
export class CardSecretaryFormComponent {
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

