import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/welcome');
      return false;
    }
    return true;
  }


}
