import { Route } from '@angular/router';
import { DespachoComponent } from './components/despacho.component';
import { FacturasDespachoComponent } from './components/facturas-despacho/facturas-despacho.component';

export const routes: Route[] = [
  { path: '', //component: DespachoComponent,
    children: [ 
      {path: 'ingresar-factura', component: FacturasDespachoComponent},
      {path: 'home', component: DespachoComponent},
      {path: '**', redirectTo: 'home'}
    ]

},
];
