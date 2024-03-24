import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResetPass } from '../../service/restPass.service';
import { ForPassService } from '../../service/forPass.service';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css',
})
export class ChangePassComponent implements DoCheck, OnInit {
  constructor(
    private router: Router,
    private forms: FormBuilder,
    private restpass: ResetPass,
    private forpass: ForPassService
  ) {}
  email: any = '';
  ngOnInit(): void {
    this.email = this.forpass.post();
  }
  isSubmitted: boolean = false;
  isPasswordOpen: boolean = false;
  isPasswordClose: boolean = true;
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

  formData = this.forms.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    Repeatpassword: ['', [Validators.required, Validators.minLength(6)]],
  });
  isPasswordMisMatch: any = false;

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
  isClickBtn = () => {
    let obj = {
      email: this.forpass.post(),
      password: this.formData.get('password')?.value,
    };
    this.restpass.isSendData(obj);
  };
}
