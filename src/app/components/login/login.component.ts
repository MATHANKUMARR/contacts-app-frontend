import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppInterceptorService } from 'src/app/services/app-interceptor/app-interceptor.service';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    localStorage.setItem("accessToken",'');
  }
 
  onSubmitLogin(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe( res =>{
        if(res.token.length){
          AppInterceptorService.accessToken = res.token;
          localStorage.setItem("accessToken",res.token);
          localStorage.setItem("username",this.loginForm.value.username);
          this.router.navigate(['/home']);
        }else{
          console.log("Invalid");
        }
      })
    }else{
      console.log("Field Empty");
    }
  }

  gotoRegister(){
    this.router.navigate(['/register']);
  }

}
