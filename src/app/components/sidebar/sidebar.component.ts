import { Component, OnInit } from "@angular/core";
import { CalendarSchedulerViewComponent } from "angular-calendar-scheduler/public_api";
import * as moment from 'moment';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
