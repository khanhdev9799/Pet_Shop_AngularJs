import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUser: User[]=[];
  CurrentUser: User= new User();

  constructor() { }

  register(user: User){
    let isExist = false;
    for (let i=0; i<this.listUser.length;i++){
      const element= this.listUser[i];
      if (element.username==user.username){
        isExist= true;
        break;
      }
    }
    if (isExist== false){
      user.id=this.listUser.length+1;
      this.listUser.push(user);
      this.saveListUser()
      return user;
    }
    return false;
  }

  login(username: string, password: string){
    let isLogin= false;
    for (let i=0; i<this.listUser.length;i++){
      const element= this.listUser[i];
      if (element.password==password&&element.username== username){
        this.CurrentUser= element;
        localStorage.setItem('User',JSON.stringify(this.CurrentUser));
        isLogin= true;
        break;
      }
    }
    return isLogin;
  }

  saveListUser(){
    localStorage.setItem('ListUser',JSON.stringify(this.listUser))
  }

  readListUser(){
    try {
      let str = localStorage.getItem('User');
      if (str != null && str.length > 0) {
        this.listUser = JSON.parse(str);
      } else {
        this.listUser = [];
      }
    } catch (error) {
      console.error(error);
      this.listUser = [];
    }
  }

  readUserLogin() {
    try {
      let str = localStorage.getItem('User');
      if (str != null && str.length > 0) {
        this.CurrentUser = JSON.parse(str);
      } else {
        this.CurrentUser = new User();
      }
    } catch (error) {
      console.error(error);
      this.CurrentUser = new User();
    }
  }

  logout() {
    this.CurrentUser = new User();
    localStorage.removeItem('User');
  }
}
