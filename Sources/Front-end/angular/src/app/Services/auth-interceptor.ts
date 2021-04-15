import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from 'src/app/Services/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService: UsersService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .do(
                    succ => {
                    },
                    err => {
                        if (err.status === 401)
                            this.router.navigate(['Login']);
                        else if (err.status === 406) {
                            console.log(err)
                            this.checkTokenValidity()
                        }
                        // else if (err.status === 403)
                        //     this.router.navigate(['403']);
                        else if (err.status === 404)
                            this.router.navigate(['/Error/404']);
                        else if (err.status === 500)
                            this.router.navigate(['500']);
                        else if (err.status === 0) {
                            this.router.navigate(['500']);
                        }

                    }
                );
        }
        else {
            this.router.navigate(['Login']);;
        }
    }
    checkTokenValidity() {
        if (localStorage.getItem('userToken') != null) {
            this.userService.userCheckTokenValidity().subscribe((response: any) => {
            }, error => {
                localStorage.removeItem('userToken');
                this.router.navigate(['Login']);
            });
        }

    }
}
