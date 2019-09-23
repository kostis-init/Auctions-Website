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
export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]) :boolean {
    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/welcome');
      return false;
    }
    return true;
  }

}
