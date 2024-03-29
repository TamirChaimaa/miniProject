import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
@Component({
  selector: 'app-card-schedule-form',
  templateUrl: './card-schedule-form.component.html',
  styleUrls: ['./card-schedule-form.component.scss']
})
export class CardScheduleFormComponent implements OnInit, OnChanges {
  peroids = [];
  @Input() codeCin = '';
  @Output() refresh = new EventEmitter();
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
  ngOnChanges(changes: SimpleChanges): void {
      if( changes['codeCin']){
        console.log(this.codeCin);
        
        this.cin.setValue(this.codeCin);
      }
  }

  get cin() {
    return this.form.get('cin');
  }

  extractTime(index) {
    const t = this.form.get('time').value;

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

    const res = {
      patient_CIN: this.cin.value,
      start_time: this.startTime + ":00",
      end_time: this.endTime + ":00",
      reason: this.reason.value,
    }

    return res;
  }


  save() {
    this.errors = undefined
    this.submitLoading = true;
    let request = {
      url: 'appointments',
      method: this.appntId ? 'put' : 'post',
      message: 'Modification Success'
    }
    if (this.appntId) request.url += '/' + this.appntId;
    this.dataService.sendRequest(request.method == 'put' ? 'put' : 'post', request.url, this.data).subscribe((resp: any) => {
      console.log(resp);
      this.toastrNotificationService.showSuccess(request.message, '')
      if(this.codeCin.length){
        this.refresh.emit();
        this.router.navigateByUrl('profile')

      }else{
        this.router.navigateByUrl('admin/patients')

      }
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
      if(resp.cin)
        this.cin.setValue(resp.cin)
      // this.form.patchValue(JSON.parse(resp.apnt))
    })
    for (let index = 9; index < 18; index = index + 1) {
     
      this.peroids.push(`from ${index < 10 ? '0' + index : index}:00 to ${index < 10 ? '0' + index : index}:30`)
      this.peroids.push(`from ${index < 10 ? '0' + index : index}:30 to ${(index+1) < 10 ? '0' + (index+1) : (index+1)}:00`)
    }
  }

}
