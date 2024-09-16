
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { COMPONENTS } from '../../../../../shared/src/lib/exports/export-components';
import { MODULES } from 'libs/vym/frontend/shared/src/lib/exports/export-modules';

@Component({
  selector: 'vym-app',
  standalone: true,
  imports: [COMPONENTS, MODULES] ,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
