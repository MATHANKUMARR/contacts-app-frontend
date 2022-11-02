import { Component, Inject} from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{

  constructor(@Inject(MAT_DIALOG_DATA) private data:HomeComponent,
              private api:ApiServiceService) { }

  user:any = this.data;
  details:any = this.user[0];
  contact:any=this.user[1];
  address:any=this.user[2];
  department:any=this.user[3];



}
