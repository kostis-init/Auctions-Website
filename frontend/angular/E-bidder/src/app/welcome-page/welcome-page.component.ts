import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {fadeInAnimation, slideInAnimation} from "../shared/animations";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
  animations: [
    fadeInAnimation

  ]
})
export class WelcomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
