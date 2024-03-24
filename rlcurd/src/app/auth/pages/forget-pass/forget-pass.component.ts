import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { ForPassService } from '../../service/forPass.service';

@Component({
  selector: 'app-forget-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css',
})
export class ForgetPassComponent {
  obj: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private forms: FormBuilder,
    public login: LoginService,
    private forpass: ForPassService,
    private tost: ToastrService
  ) {}
  isOTP: boolean = false;
  btn: boolean = true;
  btn1: boolean = false;
  // forms handle
  formData = this.forms.group({
    email: [
      '',
      [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')],
    ],
  });
  isSubmitted: boolean = false;
  isLoading: any = false;

  sendOTP = () => {
    this.isLoading = true;

    try {
      this.http
        .post<any>('http://localhost:3000/optverifiy', {
          email: this.formData.get('email')?.value,
        })
        .subscribe({
          next: (data: any) => {
            if (data.message === 'user not found') {
              return this.tost.warning(data.message);
            } else {
              this.isLoading = true;
              this.isOTP = true;
              this.btn1 = true;
              this.btn = false;
              this.forpass.get(this.formData.get('email')?.value);
              return this.tost.success(data.message);
            }
          },
          error: (e) => {
            this.tost.error(e.message + 'errrr');
            console.log('error 3 ------ ', e);
          },
        })
        .add(() => {
          this.isLoading = false;
        });
    } catch (error) {
      console.error(error);
    }
  };
  otpvalue: string = '';
  //  verifiyOTP
  // the ngmodel store value
  verifiyotnbtnClick = () => {
    let obj: object = {
      email: this.formData.get('email')?.value,
      otp: this.otpvalue,
    };
    this.forpass.verifiyOTP(obj);
  };
  back = () => {
    this.router.navigate(['test/login']);
  };
}
