import { Routes } from '@angular/router';
import { AppComponent } from './components/app.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'despacho',
        loadComponent: () =>
          import(
            '../../../facturas-despacho/src/lib/components/facturas-despacho/facturas-despacho.component'
          ).then((m) => m.FacturasDespachoComponent),
      },
      {
        path: 'notas-credito',
        loadComponent: () =>
          import(
            '../../../notas-credito/src/lib/components/notas-credito/notas-credito.component'
          ).then((m) => m.NotasCreditoComponent),
      },
    ],
  },
];
