import { Component, Inject} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data:HomeComponent,
              private api:ApiServiceService,private fb: FormBuilder) { }

  user:any = this.data;
  details:any = this.user[0];
  contact:any=this.user[1];
  address:any=this.user[2];
  department:any=this.user[3];

  isVisibleUpdate = false;
  isEditable = true;

  userDetailsForm = this.fb.group({
    details : this.fb.group({
      username : [this.details.username],
      firstName : [this.details.firstName],
      lastName : [this.details.lastName],
      primaryEmailId : [this.details.primaryEmailId],
      secondaryEmailId : [this.details.secondaryEmailId],
      designation : [this.details.designation],
      passkey : [this.details.passkey],
      confirmPasskey : [this.details.confirmPasskey],
      departmentId : [this.details.departmentId],
      password : [this.details.password],
      userId : [this.details.userId]
    }),
    contacts : this.fb.group({
      contactId : [this.contact.contactId],
      countryCode : [this.contact.countryCode],
      primaryMobileNumber : [this.contact.primaryMobileNumber],
      secondaryMobileNumber : [this.contact.secondaryMobileNumber],
      userId : [this.details.userId]
    }),
    address : this.fb.group({
      addressId : [this.address.addressId],
      tDoorNo : [this.address.tDoorNo],
      tStreetName : [this.address.tStreetName],
      tCity : [this.address.tCity],
      tPinCode : [this.address.tPinCode],
      tState : [this.address.tState],
      tCountry : [this.address.tCountry],
      pDoorNo : [this.address.pDoorNo],
      pStreetName : [this.address.pStreetName],
      pCity : [this.address.pCity],
      pPinCode : [this.address.pPinCode],
      pState : [this.address.pState],
      pCountry : [this.address.pCountry],
      userId : [this.details.userId]
    }),
    departments : this.fb.group({
      id : [this.department.id],
      departmentId : [this.department.departmentId],
      departmentName : [this.department.departmentName],
      details : [this.department.details],
      userId : [this.details.userId]
    })
  });

  updateProfileOpen(){
    this.isVisibleUpdate = true;
    this.isEditable = false;
  }

  update(){
    this.api.patchUser(this.details.userId,this.userDetailsForm.value.details).subscribe(res => {
      console.log(res);
    });
    this.api.patchContact(this.contact.contactId,this.userDetailsForm.value.contacts).subscribe(res => {
      console.log(res);
    });
    this.api.patchAddress(this.address.addressId,this.userDetailsForm.value.address).subscribe(res => {
      console.log(res);
    });
    this.api.patchDepartment(this.department.id,this.userDetailsForm.value.departments).subscribe(res => {
      console.log(res);
    });
    location.reload();
  }
}
