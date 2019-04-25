import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {
  checked = false;
  email = '';
  inb;
  snt;
  subject;
  recieved_mail;
  message;
  seen;
  starred;
  date;
  time;

  composeForm: FormGroup;
  constructor(private _myservice: UserService,
    private router: Router,
    private _activatedRoute: ActivatedRoute) {
      this.composeForm = new FormGroup({
        email: new FormControl(this.email),
        to: new FormControl(null, Validators.required),
        subject: new FormControl(null, Validators.required),
        message: new FormControl(null, Validators.required)
      });

      console.log(this.email);
     }

  ngOnInit() {
    this.isloggedin();
    this._activatedRoute.params.subscribe(params =>{
      this.recieved_mail=params['recieved_mail'];
      this.subject = params['subject'];
      this.message= params['message']
      this.seen= params['seen'];
      this.starred= params['starred'];
      this.date= params['date'];
      this.time= params['time'];
    })

  }

  isValid(controlName) {
    return this.composeForm.get(controlName).invalid && this.composeForm.get(controlName).touched;
  }


  changeInbox() {
    this.fetchInbox();
  }

  changeSent() {
    this.fetchSent();
  }

  changeImp() {

  }

  changeTrash() {

  }




  addMail() {
    console.log(this.composeForm.valid);
    if (this.composeForm.valid) {
        this._myservice.addMail(this.composeForm.value)
        .subscribe(
          data => {
            this.router.navigateByUrl('/inbox');
          }
        );
    }
  }


  isloggedin() {

    this._myservice.getUserName()
    .subscribe(
      data => {this.email = data.toString();this.checked=true;},
      err => this.router.navigateByUrl('/login'),

    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../login']);
  }


  fetchInbox() {
    this._myservice.getInbox(this.email)
    .subscribe((data) => {
        this.inb = data;
        console.log(this.inb);
    });
  }

  fetchSent() {
    this._myservice.getSent(this.email)
    .subscribe((data) => {
      this.inb = data;
      console.log(this.inb);
    });
  }




}
