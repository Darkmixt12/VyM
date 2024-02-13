import { ChangeDetectionStrategy, Component, inject,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DespachoService } from '../services/despacho.service';

@Component({
  selector: 'vym-ingresar-despacho',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingresar-despacho.component.html',
  styleUrls: ['./ingresar-despacho.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngresarDespachoComponent {
 private despachoService = inject(DespachoService);

}

