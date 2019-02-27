import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pmail';
  username = '';


constructor (private userservice: UserService, private router: Router) {


}
isloggedin() {
  if (localStorage.getItem('token') != null) {
    return true;
  } else {
    return false;
  }

}

openNav() {
  document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

closeNav() {
  document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}


loggedout() {
  localStorage.removeItem('token');
  this.router.navigateByUrl('/login');
}



}



