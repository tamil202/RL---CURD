import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResetPass {
  constructor(
    private http: HttpClient,
    private tost: ToastrService,
    private router: Router
  ) {}

  isSendData = async (obj: object) => {
    console.log('--------------------------------', obj);

    try {
      this.http
        .put<any>('http://localhost:3000/updatePassword', obj)
        .subscribe({
          next: (data: any) => {
            this.tost.success(data.message);
            this.router.navigate(['test/login']);
          },
          error: (e) => {
            this.tost.error(e);
            console.log('error 5 ------ ', e);
          },
        });
    } catch (error) {
      console.log('Error of data post in service ', error);
    }
  };
}
