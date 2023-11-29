// import { Routes } from '@angular/router';
// import DespachoComponent from '../../../facturas-despacho/src/lib/components/despacho.component';

// export const appRoutes: Routes = [{ path: '', component: DespachoComponent, children: [
// 	{
// 		 path: '',
// 		 loadComponent: () => import('../../../facturas-despacho/src/lib/components/despacho.component').then( m => m.DespachoComponentModule)
// 		}]}];

import { Routes } from '@angular/router';
import { AppComponent } from './components/app.component';

export const appRoutes: Routes = [{ path: '', component: AppComponent, children: [
	{
		 path: '',
		 loadChildren: () => import('../../../facturas-despacho/src/lib/components/despacho.component').then( m => m.DespachoComponentModule)
		}]}];