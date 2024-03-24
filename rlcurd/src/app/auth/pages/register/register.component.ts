import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, ViewEncapsulation, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements DoCheck, OnInit {
  constructor(
    private router: Router,
    private forms: FormBuilder,
    public auth: AuthService
  ) {}
  // for view tag innertext details
  innerBody = {
    heading: 'create account',
    spanErrorUser: 'Enter valid name',
    spanErrorEmail: 'Enter valid Email',
    spanErrorPassword: '6 character must',
  };

  // navigate function
  isClickA = () => {
    this.router.navigate(['test/login']);
  };

  // forms handle
  formData = this.forms.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    email: [
      '',
      [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    Repeatpassword: ['', [Validators.required, Validators.minLength(6)]],
  });
  // forms submit after works
  formSubmit = () => {
    let obj = {
      username: this.formData.get('username')?.value,
      email: this.formData.get('email')?.value,
      password: this.formData.get('password')?.value,
    };
    try {
      this.auth.isSendData(obj);
    } catch (error) {
      console.log('error form submit ', error);
    }
  };

  // hook used for forms check valid
  // any error for form validation // the dom manucaution
  isUserName: boolean = false;
  isEmail: boolean = false;
  isPassword: boolean = false;
  isSubmitted: boolean = false;
  isPasswordOpen: boolean = false;
  isPasswordClose: boolean = true;
  isPasswordMisMatch: any = false;

  // password view
  isPasswordManage = () => {
    let passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement | null;

    if (passwordField && passwordField.type === 'password') {
      passwordField.type = 'text';
      this.isPasswordClose = false;
      this.isPasswordOpen = true;
    } else if (passwordField) {
      passwordField.type = 'password';
      this.isPasswordClose = true;
      this.isPasswordOpen = false;
    }
  };
  // ngModel value store
  isEmaivalidation: string = '';

  ngDoCheck(): void {
    // password match
    if (
      this.formData.get('password')?.value ===
      this.formData.get('Repeatpassword')?.value
    ) {
      this.isPasswordMisMatch = false;
    } else {
      this.isPasswordMisMatch = true;
    }
  }

  ngOnInit(): void {}
}
