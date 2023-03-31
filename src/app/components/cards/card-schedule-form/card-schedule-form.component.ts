import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-schedule-form',
  templateUrl: './card-schedule-form.component.html',
  styleUrls: ['./card-schedule-form.component.scss']
})
export class CardScheduleFormComponent implements OnInit {
  peroids = [];
  errors
  ngOnInit(): void {
    this.init()
  }

  init(){
    for (let index = 9; index < 18; index=index+1) {
      this.peroids.push(`from ${index}:00 to ${index}:30`)
      this.peroids.push(`from ${index}:30 to ${index+1}:00`)
    }
  }

}
