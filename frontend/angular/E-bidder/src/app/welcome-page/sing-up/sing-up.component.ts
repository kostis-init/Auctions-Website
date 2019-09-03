import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserModel} from "../../shared/user.model";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})

export class SingUpComponent implements OnInit {

  error:string = null;
  constructor(private auth: AuthService,private route:ActivatedRoute,private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){

    const User:UserModel = this.setUpUser(form);
    this.auth.SignUp(User).
    subscribe(() => {
      this.router.navigate(["/main/home"],{relativeTo:this.route})
    },
    (error:string) => {
      this.error = error
    });
  }



  setUpUser(form: NgForm) {
    return new UserModel(
      form.form.value.username,
      form.form.value.password,
      form.form.value.passwordVerfication,
      form.form.value.fistName,
      form.form.value.lastName,
      form.form.value.email,
      form.form.value.phoneNumber,
      form.form.value.country,
      form.form.value.city,
      form.form.value.adderss,
      form.form.value.agf
    );
  }


}
