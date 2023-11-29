import { Routes } from '@angular/router';
import { AppComponent } from './components/app.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '../../../facturas-despacho/src/lib/components/despacho.component'
          ).then((m) => m.DespachoComponentModule),
      },
    ],
  },
];
