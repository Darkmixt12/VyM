import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vym-facturas-responsables',
  standalone: true,
  imports: [CommonModule, FacturasResponsablesComponent,],
  templateUrl: './facturas-responsables.component.html',
  styleUrl: './facturas-responsables.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasResponsablesComponent {

  
}
