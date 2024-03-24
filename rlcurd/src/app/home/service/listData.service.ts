// import { Injectable, DoCheck } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class ListData implements DoCheck {
//   constructor(private http: HttpClient) {
//     this.http.get<any>('http://localhost:3000/list').subscribe({
//       next: (data: any) => {
//         this.dataArray.push(data);
//         console.log('service', this.dataArray);
//       },
//     });
//   }
//   // store data in array
//   dataArray: any = [];

//   // any time data fetch
//   ngDoCheck(): void {}
// }
