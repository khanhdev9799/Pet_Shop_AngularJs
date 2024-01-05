import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userModel: User = new User();

  constructor(
    private router: Router,
    private user: UserService
  ) {}

  ngOnInit(): void {
    
  }

  onSubmitRegister(frm: NgForm) {
    if (frm.valid) {
      let kq = this.user.register(this.userModel);
      if (kq === false) {
        alert('Khong dang ky duoc ! Vui long chon username khac');
      } else {
        alert('Dang ky thanh cong');
        this.router.navigate(['/login']);
      }
    } else {
      alert('Vui long hoan thanh form');
    }
  }
}
