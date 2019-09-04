import {Component, Input} from '@angular/core';
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
