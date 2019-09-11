import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {AppState} from "./store/app.reducer";
import {Store} from "@ngrx/store";
import {UserAutoLogin} from "./auth/store/auth.actions";
import {AuthService} from "./auth/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent{
  title = 'E-bidder';

  constructor(){}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
