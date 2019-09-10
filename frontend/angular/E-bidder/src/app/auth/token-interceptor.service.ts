import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor (public auth: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(req);
    let token = localStorage.getItem('token');
    const newreq = req.clone({
      setHeaders :{
        'Authorization': 'Bearer '+token,
      }
    });
    console.log(newreq.headers);


    return next.handle(newreq);
  }
}
