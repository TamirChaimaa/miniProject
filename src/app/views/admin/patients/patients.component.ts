import { Component, OnInit } from "@angular/core";
import { ModulesMessengerService } from "src/app/services/modules-messenger.service";

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
})
export class PatientsComponent implements OnInit {
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
      name: "fullname",
      title: "fullname ",
      search: true,
      sort: true,
    },
    {
      name: "age",
      title: "age",
    },
     {
      name: "appointment",
      title: "appointment",
      sort: true,
    },
    {
      name: "createdat",
      title: "created at",
      type: "date",
      sort: true
    },
  ];


  constructor(private modulesMessengerService: ModulesMessengerService) {}

  ngOnInit(): void {
    this.modulesMessengerService.sendMessage({type: 'header-title', data: 'Patient table'})

  }
}
