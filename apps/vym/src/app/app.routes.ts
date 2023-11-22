import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => {
      return import('@vym/libs/frontend/lib/routes').then((r) => r.appRoutes);
    },
  },
];
