import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vym-facturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasComponent {}

