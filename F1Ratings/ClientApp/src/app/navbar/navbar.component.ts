import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  loggedInFlag = false;
  username: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.loggedInFlag = true;
      this.username = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])).Username;
    }
    
  }

  onLogout(){
    localStorage.removeItem('token');
    this.loggedInFlag = false;
  }

  onLogin(){
    this.router.navigateByUrl('/user/login');
  }

}
