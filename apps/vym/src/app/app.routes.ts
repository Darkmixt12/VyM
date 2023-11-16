import { Route } from '@angular/router';

export const appRoutes = [
  {
    path: '',
    loadChildren: () => {
      return import('@vym/libs/frontend/lib/routes').then((r) => r.appRoutes);
    },
  },
];
