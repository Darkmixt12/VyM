import { Route } from '@angular/router';


export const appRoutes = [
  {
    path: '',
    loadChildren: () => {
      return import('@vym/frontend/app').then((r) => r.appRoutes)
    }
  },
];
