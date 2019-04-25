import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  successMessage: String = '';
  private _myservice;
  constructor(private _router: Router, private http: HttpClient,
    private _activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.required),
     first_name: new FormControl('', Validators.required),
     last_name: new FormControl('', Validators.required),
     phone_no: new FormControl('', [Validators.required] ),
     gender: new FormControl('Male', Validators.required),
    password: new FormControl('', Validators.required),
      cnfpass: new FormControl('', this.passValidator)
    });

    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );
      this._myservice = new UserService(http);
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  register() {
    console.log(this.myForm.value);
    console.log(this.myForm.valid);
    if (this.myForm.valid) {
      this._myservice.register(this.myForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Success',
          error => this.successMessage = 'SOme error'
        );
        this.movetologin();
    }

  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }

}
