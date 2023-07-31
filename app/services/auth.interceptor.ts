import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{ //Modify HTTP request before send to server

  constructor(private loginService:LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.loginService.getToken(); //Get the token from localStorage
    if(token != null){
      authReq = authReq.clone({ //If is ok, the authReq is clone and include the authorization
        setHeaders : {Authorization: `Bearer ${token}` }
      })
    }
    return next.handle(authReq); //Lets to the server or to next AuthReq
  }
}

export const authInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS, //Specifies the Token as an interceptor
    useClass : AuthInterceptor, //Class that uses Interceptor
    multi : true //Many interceptors can be used
  }
]
