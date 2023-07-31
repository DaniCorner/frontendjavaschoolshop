import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

isLoggedIn = false;
user:any = null;

constructor(public login:LoginService) { }

ngOnInit(): void {
  this.isLoggedIn = this.login.isLoggedIn();
  this.user = this.login.getUser();
  this.login.loginStatusSubject.asObservable().subscribe(
    data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    }
  )
}

public logout(){
  this.login.logout();
  window.location.reload();
  }
}
