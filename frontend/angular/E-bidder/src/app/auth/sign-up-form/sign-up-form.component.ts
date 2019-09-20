import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {NgForm} from "@angular/forms";
import {UserSignupModel} from "../../shared/Models/user-signup.model";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent{
  @Input('CustomClass') FromClass:string;

  error:string = null;
  SignUpSucces:boolean = false;
  lot:number;
  lat:number;
  constructor(private auth: AuthService,private route:ActivatedRoute,private router: Router, private store: Store<AppState>) { }


  Setlot(value: number) {
    console.log(value);
    this.lot = value;
  }

  Setlat(value:number){
    console.log(value);
    this.lat =value;
  }

  ngOnInit() {
  }

  onSignup(form: NgForm){

    const User:UserSignupModel = this.setUpUser(form);
    this.auth.SignUp(User).
    subscribe(() => {
        this.SignUpSucces = true;
      },
      (error:string) => {
        this.error = error
      });
  }



  setUpUser(form: NgForm) {
    console.log(form);
    let User:UserSignupModel = new UserSignupModel(
      form.form.value.username,
      form.form.value.password,
      form.form.value.passwordVerification,
      form.form.value.firstName,
      form.form.value.lastName,
      form.form.value.email,
      form.form.value.phoneNumber,
      form.form.value.country,
      form.form.value.city,
      form.form.value.address,
      form.form.value.afm,
      form.form.value.latitude,
      form.form.value.longitude
    );

    return User;
  }

}
