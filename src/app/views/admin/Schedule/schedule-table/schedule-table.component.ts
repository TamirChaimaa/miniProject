import { Component, Input, Output,EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnChanges {
  @Input() dataLoading = false;
  @Input() data;

  arrayData;
  @Output() changeStatusEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  headers = [
    {
      name: "ID",
      title: "id",
    },
    {
      name: "CIN",
      title: "cin",
    },
    {
      name: "full_name",
      title: "full_name",
    },
    {
      name: "start_time",
      title: "start_time ",
    },
    {
      name: "end_time",
      title: "end_time ",

    },

     {
      name: "status",
      title: "status",
      type: 'status'
    },
    {
      name: "createdat",
      title: "created at",
      type: "date",
      sort: true
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && this.data){
        console.log('schedule-table', this.data);
    }
  }
}
