import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
import {AccessDeniedComponent} from "./shared/access-denied/access-denied.component";
import {AdminPageGuardService} from "./auth/admin-page-guard.service";

const routes: Routes =[
  {path: '', redirectTo:'welcome', pathMatch: 'full' },
  {path: 'forbidden', component: AccessDeniedComponent},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminPageGuardService]
})

export class AppRoutingModule {}
