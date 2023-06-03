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
    },
    {
      name: "CIN",
      title: "CIN",
    },
    {
      name: "name",
      title: "fullname ",
    },
     {
      name: "email",
      title: "email",
      sort: true,
    },
    {
      name: "createdat",
      title: "created at",
      type: "date",
    },
  ];

  
  constructor(private modulesMessengerService: ModulesMessengerService ) {}

  ngOnInit(): void {
    this.modulesMessengerService.sendMessage({type: 'header-title', data: 'Secritary table'})
  }
}
