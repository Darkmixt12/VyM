import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vym-facturas-despacho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturas-despacho.component.html',
  styleUrls: ['./facturas-despacho.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasDespachoComponent {}
