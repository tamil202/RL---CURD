import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AddDelete {
  constructor(private http: HttpClient, private tost: ToastrService) {}

  postData = (obj: any) => {
    this.http.post<any>('http://localhost:3000/dataAdd', obj).subscribe({
      next: (data: any) => {
        this.tost.success(data.message);
      },
      error: (e) => {
        this.tost.error('some thing went wrong');
      },
    });
  };

  // delete userDetails
  deleteUser = (id: any) => {
    console.log('----------------------', id);
    let obj = {
      id: id,
    };
    this.http.post<any>(`http://localhost:3000/deleteuser`, obj).subscribe({
      next: (data: any) => {
        this.tost.success(data.message);
      },
      error: (e) => {
        this.tost.error('some thing went wrong');
        console.log(e);
      },
    });
  };
}
