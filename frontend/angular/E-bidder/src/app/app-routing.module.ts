import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";

const routes: Routes =[
  {path: '', redirectTo:'/welcome', pathMatch: 'full' },
  {path: 'main', loadChildren: './main-page/main-page.module#MainPageModule'}


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
