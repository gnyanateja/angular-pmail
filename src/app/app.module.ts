import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserService} from './user.service';
import { InboxComponent } from './inbox/inbox.component';
import { MsgComponent } from './msg/msg.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'inbox', component: InboxComponent},
  {path: 'msg', component: MsgComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}, // pathmatch is used for checking exact match

];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InboxComponent,
    MsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
