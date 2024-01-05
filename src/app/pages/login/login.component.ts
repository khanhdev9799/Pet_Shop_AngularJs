import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private user: UserService
  ) {}

  ngOnInit(): void {
  
  }

  onSubmitLogin(frm: NgForm) {
    if (frm.valid) {
      let kq = this.user.login(this.username, this.password);
      if (kq === true) {
        this.router.navigate(['/products']);
      } else {
        alert('Thong tin dang nhap khong chinh xac');
      }
    } else {
      alert('Vui long hoan thanh form');
    }
  }
}