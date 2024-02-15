import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespachoComponent } from '../despacho.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable, Subject, map, startWith } from 'rxjs';
import { DespachoService } from '@vym/shared/service/DespachoService';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { Factura } from '@vym/shared/interfaces';

import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';




interface mesa {
  value: string,
  viewValue: string
}


@Component({
  selector: 'vym-facturas-despacho',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule,MatButtonModule,MatTableModule,MatSelectModule ,DespachoComponent, ReactiveFormsModule, MatFormFieldModule,MatDatepickerModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatInputModule],
  templateUrl: './facturas-despacho.component.html',
  styleUrls: ['./facturas-despacho.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasDespachoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private despachoService = inject(DespachoService);
  public triggerButton = new Subject<void>();

 //? CAMBIAR AQUI CUANDO LLEGUE UN NUEVO MIEMBRO AL TEAM
 private miembrosVyM = this.despachoService.miembrosVym
 // SELECT PARA NUMERO DE MESA
 mesas: mesa[] = [
   {value: 'MESA 1', viewValue: '1'},
   {value: 'MESA 2', viewValue: '2'},
   {value: 'MESA 3', viewValue: '3'},
 ];
 maxDate: Date;
 // AUTO SELECT INTELIGENTE DEL FORM ALISTADOR
 nameAlistadorFilter = new FormControl('');
 optionsAlistador: string[] = this.miembrosVyM;
 filteredOptionsAlistador!: Observable<string[]>;
 // AUTO FILTRADO 
 nameChequeadorFilter = new FormControl('');
 optionsChequeador: string[] = this.miembrosVyM
 filteredOptionsChequeador!: Observable<string[]>;

   formAddFactura: FormGroup; /* nombre del formulario en el HTML */

  
    /* title!: string para inicializar si nnecesidad de igual a algo */
   public status!: string; /* sirve para cuando se guarde o no en la base de datos tire un mensaje */
 constructor(
   private dateAdapter: DateAdapter<any>,
 ){
   this.maxDate = new Date();
   this.formAddFactura = this.fb.group({
     factuasId: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern("^[0-9]*$")] ], // cuando hay mas de una validacion color [ ] convirtiendo las validaciones en un Array
     cliente: ['',Validators.required],
     fechaReg: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
     numPedido: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(5), Validators.pattern("^[0-9]*$")]],
     nameChequeador: [''],
     nameAlistador: [''],
     fechaAlistado: [null,Validators.required],
     fechaChequeo: [null,Validators.required],
     horaChequeo: ['',[Validators.required,Validators.pattern("^[0-9:]+PM|pm|AM|am$")]], 
     numMesa: ['',Validators.required]
   })
   dateAdapter.setLocale('es');
 }

 ngOnInit(){
   this.filteredOptionsAlistador = this.nameAlistadorFilter.valueChanges.pipe(
     startWith(''),
     map(value => this._filter(value || '')),
   );

   this.filteredOptionsChequeador = this.nameChequeadorFilter.valueChanges.pipe(
     startWith(''),
     map(value => this._filter2(value || ''))
   )
 }
 
 private _filter2(value: string): string[] {
   const filterValue2 = value.toLowerCase();

   return this.optionsChequeador.filter(option => option.toLowerCase().includes(filterValue2));
 }

 private _filter(value: string): string[] {
   const filterValue = value.toLowerCase();

   return this.optionsAlistador.filter(option1 => option1.toLowerCase().includes(filterValue));
 }
 
 // metodo para el segundo formulario
 agregarFactura2(form: any){

   // PARA CAPTURAR UNO DE LOS DATOS QUE YA CAPTURAMOS EN EL INPUT PODEMOS HACER ESTO //
   //onst cliente = this.formAddFactura.get('cliente')?.value//

   const factura: Factura = {
     _id: '',
     facturasId: this.formAddFactura.value.factura,
     numPedido: this.formAddFactura.value.numPedido,
     client: this.formAddFactura.value.cliente,
     fechaReg: this.formAddFactura.value.fechaReg.toISOString().slice(0,10),
     pushMoney: this.formAddFactura.value.pushM,
     nomAlistador: this.nameAlistadorFilter.value,
     nomChequeador: this.nameChequeadorFilter.value,
     numMesa: this.formAddFactura.value.numMesa,
     fechaAlistado: this.formAddFactura.value.fechaAlistado.toISOString().slice(0,10),
     fechaChequeo: this.formAddFactura.value.fechaChequeo.toISOString().slice(0,10),
     horaChequeo: this.formAddFactura.value.horaChequeo
     
   }
   this.despachoService.listaFacturas().pipe(
     
   );
   this.despachoService.saveFactura(factura).subscribe(
     response => {
       if(response )
         this.status = 'success';
         form.reset()
         console.log(factura)
     },
     error =>{
       if(error){
         console.log(error)
         this.status = 'failed'}
   console.log(factura);
 }
 ); 

 }

  saveFactura()  {
    this.despachoService.saveFactura(this.formAddFactura.value).subscribe();
  } 
}
