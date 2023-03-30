import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
})
export class ScheduleComponent implements OnInit {
  days = Array.from(Array(6).keys())
  constructor() {}

  ngOnInit(): void {}
}
