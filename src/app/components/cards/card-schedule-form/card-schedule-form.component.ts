import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';

@Component({
  selector: 'app-card-schedule-form',
  templateUrl: './card-schedule-form.component.html',
  styleUrls: ['./card-schedule-form.component.scss']
})
export class CardScheduleFormComponent implements OnInit {
  peroids = [];

  appntId: any;
  form = new UntypedFormGroup({
    cin: new UntypedFormControl('', [
      Validators.required,
    ]),
    date: new UntypedFormControl('', [
      Validators.required,
    ]),
    time: new UntypedFormControl('', [
      Validators.required,
    ]),
    reason: new UntypedFormControl('', [
      Validators.required,
    ]),
  });
  submitLoading = false;
  errors;
  showAlert: boolean = false;

  constructor(private toastrNotificationService: ToastrNotificationService,
    private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.init()
  }

  get cin() {
    return this.form.get('cin');
  }

  extractTime(index) {
    const t = this.form.get('time').value;
    console.log(t);

    const timeRegex = /\b(\d{1,2}:\d{2})\b/g;

    const matches = t.match(timeRegex);
    return matches[index]
  }


  get startTime() {
    return this.form.get('date').value + ' ' + this.extractTime(0)
  }

  get endTime() {
    return this.form.get('date').value + ' ' + this.extractTime(1)

  }

  get reason() {
    return this.form.get('reason');
  }


  get data() {
    console.log(this.startTime);

    const res = {
      cin: this.cin.value,
      start_time: this.startTime + ":00",
      end_time: this.endTime + ":00",
      reason: this.reason.value,
    }

    return res;
  }


  // ex(d) {
  //   const currentDate = new Date(d);

  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(currentDate.getDate()).padStart(2, '0');
  //   const hours = String(currentDate.getHours()).padStart(2, '0');
  //   const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  //   const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  //   const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   return formattedDateTime;
  // }

  save() {
    this.errors = undefined
    console.log(this.data);
    this.submitLoading = true;
    let request = {
      url: 'appointments',
      method: this.appntId ? 'put' : 'post',
      message: 'Modification Success' ? 'put' : 'Added success'
    }
    if (this.appntId) request.url += '/' + this.appntId;
    this.dataService.sendRequest(request.method == 'put' ? 'put' : 'post', request.url, this.data).subscribe((resp: any) => {
      console.log(resp);
      this.toastrNotificationService.showSuccess(request.message, '')
      this.router.navigateByUrl('admin/patients')
      this.submitLoading = false;
    }, err => {
      console.log(err);
      this.submitLoading = false;
      this.errors = err.errors;
      this.toastrNotificationService.showError(err.message, '');
    });
  }

  init() {
    this.route.queryParams.subscribe((resp: any) => {
      if (resp.apnt)
        this.appntId = JSON.parse(resp.apnt).id
      // this.form.patchValue(JSON.parse(resp.apnt))
    })
    for (let index = 9; index < 18; index = index + 1) {
     
      this.peroids.push(`from ${index < 10 ? '0' + index : index}:00 to ${index < 10 ? '0' + index : index}:30`)
      this.peroids.push(`from ${index < 10 ? '0' + index : index}:30 to ${(index+1) < 10 ? '0' + (index+1) : (index+1)}:00`)
    }
  }

}
