import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input() headers;
  @Input() createUrl;
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
}
