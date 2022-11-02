import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  constructor(private api:ApiServiceService,private authService:AuthServiceService,private router:Router) { }

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    primaryEmailId: new FormControl('',[Validators.required]),
    designation: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    confirmPasskey: new FormControl('',[Validators.required])
  });

  contactForm = new FormGroup({
    countryCode: new FormControl('',[Validators.required]),
    primaryMobileNumber: new FormControl('',[Validators.required]),
    secondaryMobileNumber: new FormControl('',[Validators.required]),
    userId: new FormControl(0,[Validators.required])
  });

  departmentForm = new FormGroup({
    departmentId: new FormControl('',[Validators.required]),
    departmentName: new FormControl('',[Validators.required]),
    details: new FormControl('',[Validators.required]),
    userId: new FormControl(0,[Validators.required])
  });

  addressForm = new FormGroup({
    pDoorNo: new FormControl('',[Validators.required]),
    pStreetName: new FormControl('',[Validators.required]),
    pCity: new FormControl('',[Validators.required]),
    pState: new FormControl('',[Validators.required]),
    pCountry: new FormControl('',[Validators.required]),
    pPinCode: new FormControl('',[Validators.required]),
    tDoorNo: new FormControl('',[Validators.required]),
    tStreetName: new FormControl('',[Validators.required]),
    tCity: new FormControl('',[Validators.required]),
    tState: new FormControl('',[Validators.required]),
    tCountry: new FormControl('',[Validators.required]),
    tPinCode: new FormControl('',[Validators.required]),
    userId: new FormControl(0,[Validators.required])
  });

  onSubmitRegister(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe( res =>{
        if(res.userId > 0){
          this.router.navigate(["/"]);
        }
      })
    }else{
      console.log("Field Empty");
    }
  }

  gotoLogin(){
    this.router.navigate(["/"]);
  }

}