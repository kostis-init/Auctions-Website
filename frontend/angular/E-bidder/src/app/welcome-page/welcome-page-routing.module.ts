import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SingInComponent} from "./sing-in/sing-in.component";
import {SingUpComponent} from "./sing-up/sing-up.component";
import {WelcomeStartComponent} from "./welcome-start/welcome-start.component";
import {WelcomePageComponent} from "./welcome-page.component";

const WelcomeRoutes: Routes = [
  {path: 'welcome', component: WelcomePageComponent, children:[
      {path: '',component:WelcomeStartComponent, data: {animation: 'start'}},
      {path: 'login', component: SingInComponent, data: {animation: 'login'}},
      {path: 'singup', component: SingUpComponent, data: {animation: 'singup'}}
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(WelcomeRoutes)
  ],
  exports:[RouterModule]
})
export class WelcomePageRoutingModule { }
