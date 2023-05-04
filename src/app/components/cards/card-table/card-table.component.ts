import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input() headers;
  @Input() createUrl;
  @Input() getUrl;
  buttons = []
  @Input() title = '';
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor() {}

  ngOnInit(): void {
    this.initButtons();
  }


  initButtons(){
    this.buttons.push({
      icon: 'fas fa-eye',
      style: 'bg-emerald-500  '
    }, {
      icon: 'fas fa-trash',
      style: 'bg-yellow-500'
    }, {
      icon: 'fas fa-edit',
      style: 'bg-red-500  hover:bg-emerald-500'
    }, {
      icon: 'fas fa-user',
      style: 'bg-indigo-500'
    })
  }


  getData(){
    if(this.getUrl == "secritaries"){
      return [
        22,
        'tamir chaimaa',
        'H255224',
        '+212653395053',
        'Jan 23, 2023, 11:24:50 AM'
      ]
    }
    if(this.getUrl == "patients"){
      return [
        22,
        'tamir chaimaa',
        '23',
        '29/03/2023 de 8 a 8:30',
        'Jan 23, 2023, 11:24:50 AM'
      ]
    }

    if(this.getUrl == "documents"){
      return [
        22,
        'tamir chaimaa',
        '29/03/2023 de 8:30 a 9',
        'En attente',
        'Jan 23, 2023, 11:24:50 AM'
      ]
    }
    return []
  }
  
}
