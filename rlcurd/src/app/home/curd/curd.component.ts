import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { capitalizePipe } from '../pipe/capitalize.pipe';
import { FilterValue } from '../pipe/filter.pipe';
// import { ListData } from '../service/listData.service';
import { AddDelete } from '../service/addDetail.service';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { showDetails } from '../components/showdetails/show-deatils.component';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-curd',
  standalone: true,
  imports: [
    CommonModule,
    capitalizePipe,
    FormsModule,
    FilterValue,
    ReactiveFormsModule,
    NgxPaginationModule,
    showDetails,
  ],
  templateUrl: './curd.component.html',
  styleUrl: './curd.component.css',
})
export class CurdComponent implements DoCheck {
  trv: any;
  constructor(
    // private dd: ListData,
    private forms: FormBuilder,
    private adddel: AddDelete,
    private http: HttpClient
  ) {
    this.http.get<any>('http://localhost:3000/allUserList').subscribe({
      next: (data: any) => {
        this.list = data;
      },
    });
  }

  list: any = [];
  search: string = '';
  isShow: boolean = false;
  edit(item: any, trv: any) {
    item.boo = true;
    trv.contentEditable = 'true';
  }
  // save
  save(item: any, trv: any) {
    item.boo = false;
    trv.contentEditable = 'false';
  }
  // delete
  delete = (trv: any, i: any) => {
    this.adddel.deleteUser(trv.id);
  };

  // add detail
  isShow1: boolean = false;
  addDetail = () => {
    this.isShow1 = true;
  };
  isEditable = true;

  firstname: string = '';
  isSubmitted: boolean = false;

  // form handle
  formData = this.forms.group({
    firstname: [
      '',
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ],
    lastname: [
      '',
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ],
    age: ['', Validators.required, Validators.maxLength(2)],
    mobile: [
      '',
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ],
    address: [
      '',
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(3),
    ],
    profession: [
      '',
      Validators.required,
      Validators.maxLength(2),
      Validators.minLength(8),
    ],
    email: [
      '',
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ],
  });
  isClose = () => {
    this.isShow1 = false;
  };

  saveData = () => {
    let obj: object = {
      id: Math.floor(10022 + Math.random() * 5000),
      firstname: this.formData.get('firstname')?.value,
      lastname: this.formData.get('lastname')?.value,
      age: this.formData.get('age')?.value,
      address: this.formData.get('address')?.value,
      email: this.formData.get('email')?.value,
      mobile: this.formData.get('mobile')?.value,
      profession: this.formData.get('profession')?.value,
    };
    console.log(obj);

    this.adddel.postData(obj);
    this.isShow1 = false;
  };
  back: boolean = false;
  ngDoCheck(): void {
    if (this.currentPage > 1) {
      this.back = true;
    } else {
      this.back = false;
    }
  }

  currentPage: number = 1;
  // pagnation
  pageAddOn = () => {
    this.currentPage += 1;
  };
  pageSubOn = () => {
    this.currentPage -= 1;
  };
  nowShow: boolean = false;
  name: string = ''
  age:string = ''
  showDetailson(x:any) {
    this.nowShow = true;
    this.name =x.firstname ;
    this.age=x.age;
    
  }
  showDetailsoff() {
    this.nowShow = false;
  }
}
