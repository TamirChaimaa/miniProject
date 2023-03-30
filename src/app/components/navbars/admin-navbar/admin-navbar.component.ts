import { Component, OnInit } from "@angular/core";
import { ModulesMessengerService } from "src/app/services/modules-messenger.service";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  title = 'Dashboard'
  constructor(private modulesMessengerService: ModulesMessengerService) {}

  ngOnInit(): void {
    this.modulesMessengerService.getMessage().subscribe((resp: any) => {
      if(resp.type == 'header-title') this.title = resp.data
    })
  }
}
