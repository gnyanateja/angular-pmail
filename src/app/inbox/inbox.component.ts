import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public myvalue1 = true;
  public myvalue2 = false;
  public myvalue3 = false;
  public myvalue4 = false;
  interval: any;
  checked=false;
  public InboxClass = {
    'active' : this.myvalue1 ,
    '' : !this.myvalue1
  };

  public SentClass = {
    'active' : this.myvalue2 ,
    '' : !this.myvalue2
  };

  public ImpClass = {
    'active' : this.myvalue3 ,
    '' : !this.myvalue3
  };

  public TrashClass = {
    'active' : this.myvalue4 ,
    '' : !this.myvalue4
  };


  email = '';
  inb;
  snt;
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
    this.fetchInbox();

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
