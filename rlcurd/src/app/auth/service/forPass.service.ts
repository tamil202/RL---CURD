import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ForPassService {
  constructor(
    private http: HttpClient,
    private tost: ToastrService,
    private router: Router
  ) {}

  verifiyOTP = async (obj: object) => {
    try {
      this.http
        .post<any>('http://localhost:3000/verifyotp', obj)
        .subscribe({
          next: (data: any) => {
            if (data.boo === true) {
              this.router.navigate(['test/restPass']);
              this.tost.success(data.message);
            } else {
              this.tost.error(data.message);
            }
            // this.isLoadingfn();
          },
          error: (e) => {
            this.tost.error(e.message);
            console.log('error 3 ------ ', e);
          },
        })
        .add();
    } catch (error) {
      console.log('Error of data post in service ', error);
    }
  };
  postEmail: any = '';
  get = (email: any) => {
    this.postEmail = email;
  };
  post = () => {
    return this.postEmail;
  };
}
