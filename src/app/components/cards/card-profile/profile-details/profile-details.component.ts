import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnChanges {
  @Input() data;
  
  ngOnInit(): void {
      
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      // this.form.patchValue({
      //   'fullname' : this.data.attributes.FullName,
      //   'phoneNumber': this.data.attributes.PhoneNumber,
      //   "dateOfBirth": this.data.attributes.DateOfBirth,
      //   "cin": this.data.attributes.CIN,
      //   'age': this.data.attributes.Age,
      //   'adresse': this.data.attributes.Adress,
      // })
      // this.form.get('cinImg').setValue(this.data.attributes.cin_image)
    }
}
}
