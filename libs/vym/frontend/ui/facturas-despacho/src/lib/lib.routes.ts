import { Route } from '@angular/router';
import { FacturasDespachoComponent } from './components/facturas-despacho/facturas-despacho.component';
import { FacturasComponent } from './components/facturasList/facturas.component';
import { FacturasResponsablesComponent } from './components/facturas-responsables/facturas-responsables.component';
import { IngresarDespachoComponent } from './components/ingresar-despacho/ingresar-despacho.component';

export const routes: Route[] = [
  { path: '', //component: DespachoComponent,
    children: [ 
      {path: 'home', component: FacturasDespachoComponent},
      {path: 'despacho', component: IngresarDespachoComponent},
      {path: 'facturas', component: FacturasComponent},
      {path: 'responsables', component: FacturasResponsablesComponent},
      {path: '**', redirectTo: 'home'}
    ]

},
];
