import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loggedInFlag = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.loggedInFlag = true;
      this.router.navigateByUrl('user/info');
    }
  }

}
