export default [
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (com) => com.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((com) => com.LoginComponent),
  },
  {
    path: 'forPass',
    loadComponent: () =>
      import('./pages/forget-pass/forget-pass.component').then(
        (com) => com.ForgetPassComponent
      ),
  },
  {
    path: 'restPass',
    loadComponent: () =>
      import('./pages/change-pass/change-pass.component').then(
        (com) => com.ChangePassComponent
      ),
  },
];
