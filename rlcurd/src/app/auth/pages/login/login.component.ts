import { Component, ViewEncapsulation, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private forms: FormBuilder,
    public login: LoginService
  ) {}
  // for view tag innertext details
  innerBody = {
    heading: 'Login',
  };
  // forms handle
  formData = this.forms.group({
    email: [
      '',
      [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  isSubmitted: boolean = false;
  isPasswordOpen: boolean = false;
  isPasswordClose: boolean = true;
  // navigate function
  isClickA = () => {
    this.router.navigate(['test/register']);
  };
  isforPass = () => {
    this.router.navigate(['test/forPass']);
  };
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
  isBtnClick = () => {
    let obj: object = {
      email: this.formData.get('email')?.value,
      password: this.formData.get('password')?.value,
    };
    try {
      this.login.isSendData(obj);
    } catch (error) {
      console.error(error, 'error 1-----');
    }
  };
}
