import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {NgForm} from "@angular/forms";
import {UserModel} from "../../shared/user.model";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent{
  @Input('CustomClass') FromClass:string;
  @Output() SignUpComplete: EventEmitter<any> = new EventEmitter<any>();

  error:string = null;
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

    console.log(form);
    const User:UserModel = this.setUpUser(form);
    this.auth.SignUp(User).
    subscribe(() => {
        this.SignUpComplete.emit(null);
        this.router.navigate(["/main/home"],{relativeTo:this.route})
      },
      (error:string) => {
        this.error = error
      });
  }



  setUpUser(form: NgForm) {
    console.log(form);
    let User:UserModel = new UserModel(
      form.form.value.username,
      form.form.value.password,
      form.form.value.passwordVerification,
      form.form.value.firstName,
      form.form.value.lastName,
      form.form.value.email,
      form.form.value.phoneNumber,
      form.form.value.country,
      form.form.value.city,
      form.form.value.adderss,
      form.form.value.afm,
      form.form.value.latitude,
      form.form.value.longitude
    );

    console.log(User);
    return User;
  }

}
