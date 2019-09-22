import {NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
import {AccessDeniedComponent} from "./shared/access-denied/access-denied.component";
import {AdminPageGuardService} from "./auth/admin-page-guard.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "./auth/token-interceptor.service";

const routes: Routes =[
  {path: '', redirectTo:'welcome', pathMatch: 'full' },
  {path: 'forbidden', component: AccessDeniedComponent},
  {path: 'admin',canLoad:[AdminPageGuardService], loadChildren: './admin/admin.module#AdminModule'},
  {path: 'main',loadChildren:'./main-page/main-page.module#MainPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminPageGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }]
})

export class AppRoutingModule {}
