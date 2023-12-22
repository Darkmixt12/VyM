import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespachoComponent } from '../despacho.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { FacturaService } from '../../services/factura-service.service';

@Component({
  selector: 'vym-facturas-despacho',
  standalone: true,
  imports: [CommonModule, DespachoComponent, ReactiveFormsModule],
  templateUrl: './facturas-despacho.component.html',
  styleUrls: ['./facturas-despacho.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasDespachoComponent {
private fb  = inject(FormBuilder)
private _facturaService = Inject(FacturaService)


public myForm: FormGroup = this.fb.group({
  id_: [''],
  numPedido: ['12345',],
  facturasId: ['32165',],
  client: ['Steven Muñoz',],
  fechaReg: ['23/12/23',],
  pushMoney: ['',],
  nomAlistador: ['Fabricio',],
  nomChequeador: ['Fernando',],
  fechaAlistado: ['23/12/23',],
  fechaChequeo: ['24/12/23',],
  numMesa: ['2',],
  horaChequeo: ['10:00 AM',],
});

onSave():void{
  console.log(this.myForm.value);
}

agregarFactura() : void{

  this._facturaService.saveFactura(this.myForm.value).pipe(
    map( console.log)
  ).subscribe('Hola desde el OBS', console.log)
  
}



}
