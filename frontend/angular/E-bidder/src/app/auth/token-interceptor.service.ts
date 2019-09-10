import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor (public auth: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');
    const newreq = req.clone({
      setHeaders :{
        'Authorization':token,
      }
    });


    return next.handle(newreq);
  }
}
