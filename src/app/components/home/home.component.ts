import { Component,OnInit} from '@angular/core';
import { MatDialog,} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { ProfileComponent } from '../profile/profile.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private api:ApiServiceService,
    private auth:AuthServiceService,
    private router:Router,
    private dialog:MatDialog) { }

    public dataSource = new MatTableDataSource<any>();
  
    user:any=[];
    data:any=[];
    displayedColumns: string[] = ['First Name', 'Last Name', 'Email','Designation'];

    address:any=[];
    contacts:any=[];
    departments:any=[];

  ngOnInit(): void {
    this.loginUser();
    this.getUserData();
    this.dataSource.data = this.data;
  }
  
  loginUser(){
    if(this.auth.isUserAvailable()){
      this.router.navigate(['/']);
    } 
  }

  showDetails(user:any){
    const contact = this.contacts[0].filter((item:any) => user.userId === item.userId);
    const address = this.address[0].filter((item:any) => user.userId === item.userId);
    const department = this.departments[0].filter((item:any) => user.userId === item.userId);

    this.dialog.open(UserComponent, {
      width: '70%',
      height: '90%',
      data: [user,contact[0],address[0],department[0]]
    });
  }

  getUserData(){
    const username = localStorage.getItem('username');
    this.api.getAllUsers().subscribe(res=>{
      this.data = res.filter((item:any) => username !== item.username);
      this.user = res.filter((item:any) => username === item.username);
      this.api.getContact(this.user[0].userId).subscribe(res =>{
        console.log(res);
        
        this.user.push(res);
        this.api.getAddress(this.user[0].userId).subscribe(res => {
          this.user.push(res);
          this.api.getDepartment(this.user[0].userId).subscribe(res => {
            this.user.push(res);
            this.api.getAllAddress().subscribe((res:any) =>{
              this.address.push(res);
              this.api.getAllContact().subscribe((res:any) =>{
                this.contacts.push(res);
                this.api.getAllDepartment().subscribe((res:any) =>{
                  this.departments.push(res);
                });
              });
            });
          });
        });
      });
    });
  }

  logout(){
    this.auth.logout();
  }

  openProfile(){
    this.dialog.open(ProfileComponent, {
      width: '30%',
      height: '70%',
      data: this.user
    });
  }
}