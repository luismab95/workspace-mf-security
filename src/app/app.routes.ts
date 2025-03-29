import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('src/app/modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];
