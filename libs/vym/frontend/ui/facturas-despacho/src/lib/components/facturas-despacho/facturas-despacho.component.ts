import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespachoComponent } from '../despacho.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DespachoService } from '../services/despacho.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'vym-facturas-despacho',
  standalone: true,
  imports: [CommonModule, DespachoComponent, ReactiveFormsModule],
  templateUrl: './facturas-despacho.component.html',
  styleUrls: ['./facturas-despacho.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasDespachoComponent {
  private fb = inject(FormBuilder);
  private despachoService = inject(DespachoService);
  public triggerButton = new Subject<void>();

  public myForm: FormGroup = this.fb.group({
    id_: [''],
    numPedido: [''],
    facturasId: [''],
    client: ['Steven Muñoz'],
    fechaReg: ['23/12/23'],
    pushMoney: [''],
    nomAlistador: ['Fabricio'],
    nomChequeador: ['Fernando'],
    fechaAlistado: ['23/12/23'],
    fechaChequeo: ['24/12/23'],
    numMesa: ['2'],
    horaChequeo: ['10:00 AM'],
  });

  agregarFactura$ = this.despachoService.saveFactura(this.myForm.value);
}
