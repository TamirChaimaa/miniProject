import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() status = 'waiting to pass';
  @Output() clicked = new EventEmitter();
  change(){
    if(localStorage.getItem('role') != 'user')
    this.clicked.emit();
  }
}
