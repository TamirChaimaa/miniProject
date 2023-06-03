import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
import { Appointement } from 'src/common/models/Appointement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule-schema',
  templateUrl: './schedule-schema.component.html',
  styleUrls: ['./schedule-schema.component.scss']
})
export class ScheduleSchemaComponent implements OnInit, OnChanges {

  days = []
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  date = {
    currentMonth: null,
    currentYear: null,
    currentDay: null,
    month: null,
    year: null,
    day: null,
    daySelected: null
  };
  @Input() dataLoading = false;
  @Input() data;
  @Output() changeStatusEvent = new EventEmitter();
  eventDays = [];
  appointements: Appointement[] = []
  constructor(
    private dataService: DataService,
    private toastrNotificationService: ToastrNotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.init()
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && this.data){
      
    this.getData();
    this.modifyCalendery()
    }
  }

  init() {
    const d = new Date();
    this.date.currentDay = d.getDate();
    this.date.currentMonth = this.monthNames[d.getMonth()]
    this.date.currentYear = d.getFullYear();

    this.date.day = this.date.currentDay;
    this.date.month = this.date.currentMonth
    this.date.year = this.date.currentYear;

  }


  getData() {
    this.data.forEach(element => {
      this.appointements.push(new Appointement(element));
    });
    console.log(this.appointements);
    this.setEventDays()
  }

  updateDate(value) {
    const currentIndex = this.monthNames.indexOf(this.date.currentMonth);
    if ((currentIndex + value) == this.monthNames.length) {
      this.date.currentMonth = this.monthNames[0];
      this.date.currentYear++
      this.modifyCalendery()
      return;
    }
    if ((currentIndex + value) < 0) {
      this.date.currentMonth = this.monthNames[this.monthNames.length - 1]
      this.date.currentYear--;
      this.modifyCalendery()
      return;
    }
    this.date.currentMonth = this.monthNames[this.monthNames.indexOf(this.date.currentMonth) + value]
    this.modifyCalendery()
  }

  modifyCalendery() {
    const firstDay = new Date(this.date.currentYear, this.monthNames.indexOf(this.date.currentMonth), 1);
    const lastDay = new Date(this.date.currentYear, this.monthNames.indexOf(this.date.currentMonth) + 1, 0);
    const first = firstDay.getDay() == 0 ? 7 : firstDay.getDay()
    this.days = []
    let cpt = 1;
    let arr = [];
    for (let i = 1; i <= 7; i++) {
      arr = []
      for (let j = 1; j <= 7; j++) {
        if (cpt < first || cpt - first + 1 > lastDay.getDate()) {
          arr.push('')
        }
        else {
          arr.push(cpt - first + 1)
        }
        cpt++
      }
      // if(this.days.length > 7 ) return
      this.days.push(arr)
    }

    this.days.forEach((arr: any[], index) => {
      if (index > 4)
        this.days[index] = arr.filter(function (el) {
          return el != '';
        });
    })

  }

  setEvent(day) {
    this.date.daySelected = day;
  }

  isEventHere(day?) {
    const d = day ? day : this.date.currentDay
    return this.eventDays.indexOf(day) != -1
  }


  setEventDays() {
    const m = this.monthNames.indexOf(this.date.month);
    this.appointements.forEach((apnt: Appointement) => {
      if (apnt.checkDateOfEvent(this.date.year, m))
        this.eventDays.push(apnt.getDay())

    })

    
  }

  getApntsByDay() {
    const d = this.date.daySelected ? this.date.daySelected : this.date.currentDay
    const apnts = []
    this.appointements.forEach((apnt: Appointement) => {
      if (apnt.checkDateOfEvent(this.date.year, this.monthNames.indexOf(this.date.month))) {
        if (d == apnt.getDay()) {
          apnts.push(apnt);
        }
      }
    })

    return apnts;
  }


  clickAction(type, apnt) {
    if (type == 'remove') {
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'Did you want to remove this appointment ?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then((response: any) => {
        if(response.isConfirmed){
          // loading remove button
          this.dataService.sendDeleteRequest('appointments' + '/' + apnt.id).subscribe((resp: any) => {
            console.log('remove', resp);
            this.toastrNotificationService.showSuccess('Remove Success', '')
            const index = this.appointements.findIndex(elm => elm.id == apnt.id);
            this.appointements.splice(index, 1)
          }, err => {
          })
        }
      });
    }else{
      this.router.navigateByUrl('admin/schedule/scheduleForm?apnt='+JSON.stringify(apnt));

    }
  }
}
