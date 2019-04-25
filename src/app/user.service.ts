import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const url="https://p-mail/herokuapp.com";

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  register(body: any) {
    return this._http.post(url+'/register', body, {
      observe: 'body'
    });
  }

  login(body: any) {
    console.log('h1i');
    return this._http.post(url+'/login', body, {
      observe: 'body'
    });
  }

  getUserName() {
    return this._http.post(url+'/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getInbox(email) {
    return this._http.post(url+'/inbox', {
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getSent(email) {
    return this._http.post(url+'/sent', {
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  addMail(body: any) {
    return this._http.post(url+'/compose', body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

}
