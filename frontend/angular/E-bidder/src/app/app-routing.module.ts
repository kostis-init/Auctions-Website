import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes =[
  {path: '', component: WelcomePageComponent },
  {path:'home',component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
