import { Routes } from '@angular/router';
import { AppComponent } from './components/app.component';

export const appRoutes: Routes = [{ path: '', component: AppComponent, children: [
	{
		 path: '',
		 loadComponent: () => import('../pages/homeTest.component')
		}]}];
