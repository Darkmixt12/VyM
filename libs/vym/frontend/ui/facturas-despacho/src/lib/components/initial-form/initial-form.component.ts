import { FacturaServiceService } from './../../services/factura-service.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Factura } from '../../interfaces/factura';
import { map } from 'rxjs';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'vym-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrl: './initial-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialFormComponent {
  #facturaService = inject(FacturaServiceService);
  formFactura!: FormGroup;

  addFactura(form: Factura) {
    this.#facturaService
      .saveFactura(form)
      .pipe(map(console.log))
      .subscribe(console.log);
  }
}
