import { Component } from '@angular/core';
import { ModulesMessengerService } from 'src/app/services/modules-messenger.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {
  headers = [
    {
      name: "id",
      title: "id",
      search: true
    },
    {
      name: "fullname",
      title: "patient name ",
      parent: "user",
      search: true,
      sort: true,
    },
     {
      name: "appointment",
      title: "appointment",
      sort: true,
    },
    {
      name: "status",
      title: "status",
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
