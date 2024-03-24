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
export class AuthService {
  constructor(
    private http: HttpClient,
    private tost: ToastrService,
    private router: Router
  ) {}
  // data post
  isSendData = async (obj: object) => {
    console.log(obj);

    try {
      this.http.post<any>('http://localhost:3000/register', obj).subscribe({
        next: (data: any) => {
          if (data.message === 'User already exists') {
            return this.tost.warning(data.message);
          } else {
            this.tost.success(data.message);
            return this.router.navigate(['test/login']);
          }
        },
        error: (e) => {
          this.tost.error(e);
          console.log('error of after post method ', e);
        },
      });
    } catch (error) {
      console.log('Error of data post in service ', error);
    }
  };
}
