import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// toster  and animations packages
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
// http client packages for Angular 17 standlone
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // any animation function
    provideToastr(), //  toaster function
    provideHttpClient(), // http provider function
  ],
};
