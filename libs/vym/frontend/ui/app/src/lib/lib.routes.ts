import { Routes } from '@angular/router';
import { AppComponent } from './components/app.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'despacho',
        loadChildren: () =>
          import(
            '../../../facturas-despacho/src/lib/lib.routes'
          ).then((m) => m.facturasDespachoRoutes),
      },
      {
        path: 'notas-credito',
        loadChildren: () =>
          import(
            '../../../notas-credito/src/lib/lib.routes'
          ).then((m) => m.notasCreditoRoutes),
      },
    ],
  },
];
