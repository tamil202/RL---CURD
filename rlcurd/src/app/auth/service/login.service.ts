import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private tost: ToastrService,
    private router: Router
  ) {}
  // data post
  isSendData = async (obj: object) => {
    try {
      this.http.post<any>('http://localhost:3000/loginuser', obj).subscribe({
        next: (data: any) => {
          if (data.message === 'Login successful') {
            this.tost.success(data.message);
            this.router.navigate(['/test2/curd']);
          } else if (data.message === ' Invalid email or password') {
            this.tost.warning(data.message);
          } else {
            this.tost.error(data.message);
          }

          localStorage.setItem('userEmail', data);
        },
        error: (e) => {
          this.tost.error(e);
          console.log('error 2 ------ ', e);
        },
      });
    } catch (error) {
      console.log('Error of data post in service ', error);
    }
  };
  //  email validation
  notFound = (): AsyncValidatorFn => {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      const email: object = { email: control.value };
      return this.http.post<any>(`http://localhost:3000/notfound`, email).pipe(
        map((response: any) => {
          if (response.available) {
            return response.available;
          } else {
            return this.tost.info('email not found');
          }
        }),
        catchError(() => of(null))
      );
    };
  };
}
