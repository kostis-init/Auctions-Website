import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthState} from "../store/auth.reducer";




@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.css']
})
export class SingInFormComponent implements OnInit {

  @Input('CustomClass') CustomClass:string;
  @Output() LoginCompleted: EventEmitter<any> = new EventEmitter<any>();

  error:string = null;
  AuthState: Observable<AuthState>;
  constructor(private store: Store<AppState>,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.AuthState = this.store.select('auth');
  }


  onSignin(form: NgForm) {

    const Username = form.value.username;
    const Password = form.value.password;
    this.authService.Login(Username,Password).subscribe( () => {
        this.LoginCompleted.emit(null);
        this.Navigate();
      },
      (error:string) => {
        this.error = error
      });

  }


  //utilie

  private Navigate() {
    const AuthState$ = this.store.select('auth');

    AuthState$.subscribe(
      ((data:AuthState) => {
        if (data.userStatus === 'user') {
          this.router.navigateByUrl('main/home');
        } else if (data.userStatus === 'admin') {
          this.router.navigateByUrl('admin');
        }
      })
    )
  }

}
