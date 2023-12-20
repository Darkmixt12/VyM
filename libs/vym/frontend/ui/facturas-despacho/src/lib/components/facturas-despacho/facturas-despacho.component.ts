import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespachoComponent } from '../despacho.component';
import { InitialFormComponent } from '../initial-form/initial-form.component';

@Component({
  selector: 'vym-facturas-despacho',
  standalone: true,
  imports: [CommonModule, DespachoComponent, InitialFormComponent],
  templateUrl: './facturas-despacho.component.html',
  styleUrls: ['./facturas-despacho.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasDespachoComponent {}
