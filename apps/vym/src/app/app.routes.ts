import { Route } from '@angular/router';


export const appRoutes = [
  {
    path: '',
    loadChildren: () => {
      return import('../../../../libs/vym/frontend/ui/app/src/lib/lib.routes').then((r) => r.appRoutes)
    }
  },
];
