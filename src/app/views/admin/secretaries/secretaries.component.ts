import { Component, OnInit } from "@angular/core";
import { ModulesMessengerService } from "src/app/services/modules-messenger.service";

@Component({
  selector: "app-secretaries",
  templateUrl: "./secretaries.component.html",
})
export class SecretariesComponent implements OnInit {
  headers = [
    {
      name: "id",
      title: "id",
      search: true
    },
    {
      name: "fullname",
      title: "fullname ",
      search: true,
      sort: true,
    },
    {
      name: "CIN",
      title: "CIN",
    },
     {
      name: "PhoneNumber",
      title: "PhoneNumber",
      sort: true,
    },
    {
      name: "createdat",
      title: "created at",
      type: "date",
      sort: true
    },
  ];

  
  constructor(private modulesMessengerService: ModulesMessengerService ) {}

  ngOnInit(): void {
    this.modulesMessengerService.sendMessage({type: 'header-title', data: 'Secritary table'})
  }
}
