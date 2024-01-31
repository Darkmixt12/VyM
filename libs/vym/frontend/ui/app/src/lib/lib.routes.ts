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
            '@vym/lib/facturas-despacho'
          ).then((m) => m.routes),
      },
      {
        path: 'notas-credito',
        loadChildren: () =>
          import(
            '@vym/lib/notas-credito'
          ).then((m) => m.routes),
      },
    ],
  },
];
