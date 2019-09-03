import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthGuardServise implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/welcome/SendLoginHttp');
      return false;
    }
    return true;
  }
}
