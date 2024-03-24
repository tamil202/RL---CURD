export default [
  {
    path: 'curd',
    loadComponent: () =>
      import('./curd/curd.component').then((com) => com.CurdComponent),
  },
];
