import { Component, OnInit } from "@angular/core";
import { ModulesMessengerService } from "src/app/services/modules-messenger.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  constructor(private modulesMessengerService: ModulesMessengerService) {}

  ngOnInit() {
    this.modulesMessengerService.sendMessage({type: 'header-title', data: 'Dashboard'})
  }
}
