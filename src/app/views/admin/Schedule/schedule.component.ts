import { Component, OnInit } from "@angular/core";
import { ModulesMessengerService } from "src/app/services/modules-messenger.service";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
})
export class ScheduleComponent implements OnInit {
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
  constructor(private modulesMessengerService: ModulesMessengerService) { }

  ngOnInit(): void {
    this.modulesMessengerService.sendMessage({ type: 'header-title', data: 'Schedule' });
    this.init()
  }

  init() {
    const d = new Date();
    this.date.currentDay = d.getDate();
    this.date.currentMonth = this.monthNames[d.getMonth()]
    this.date.currentYear = d.getFullYear();

    this.date.day = this.date.currentDay;
    this.date.month = this.date.currentMonth
    this.date.year = this.date.currentYear;


    this.modifyCalendery()
  }

  updateDate(value){
    const currentIndex = this.monthNames.indexOf(this.date.currentMonth);
    if((currentIndex + value) == this.monthNames.length ){
      this.date.currentMonth = this.monthNames[0];
      this.date.currentYear++
      this.modifyCalendery()
      return;
    }
    if((currentIndex + value) < 0){
      this.date.currentMonth = this.monthNames[this.monthNames.length - 1]
      this.date.currentYear --;
      this.modifyCalendery()
      return;
    }
    this.date.currentMonth = this.monthNames[this.monthNames.indexOf(this.date.currentMonth) + value]
    this.modifyCalendery()
  }

  modifyCalendery(){
    const firstDay = new Date(this.date.currentYear, this.monthNames.indexOf(this.date.currentMonth), 1);
    const lastDay = new Date(this.date.currentYear, this.monthNames.indexOf(this.date.currentMonth)+1, 0);
    const first = firstDay.getDay() == 0 ? 7 : firstDay.getDay()
    this.days = []
    let cpt=1;
    let arr = [];
    for(let i=1; i<=7; i++){
      arr = []
      for(let j=1; j<=7; j++){
        if(cpt < first || cpt-first+1 > lastDay.getDate()){
          arr.push('')
        } 
        else{
          arr.push(cpt-first+1)
        }
        cpt++
      }
      // if(this.days.length > 7 ) return
      this.days.push(arr)
    }

    this.days.forEach((arr: any[], index) => {
      if(index > 4)
      this.days[index] = arr.filter(function (el) {
        return el != '';
      });
    })
    
  }

  setEvent(day){
    this.date.daySelected = day;
    
  }



}
