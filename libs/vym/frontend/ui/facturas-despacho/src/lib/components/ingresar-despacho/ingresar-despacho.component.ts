import { ChangeDetectionStrategy, Component, OnInit, inject,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DespachoService } from '../services/despacho.service';


import { Observable, map, startWith, switchMap } from 'rxjs';
import { Factura } from '@vym/shared/interface/factura';

import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'vym-ingresar-despacho',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule,MatInputModule,MatFormFieldModule,MatAutocompleteModule,MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './ingresar-despacho.component.html',
  styleUrls: ['./ingresar-despacho.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngresarDespachoComponent implements OnInit {
 private despachoService = inject(DespachoService);

 nameAlistadorFilter = new FormControl('');
  filteredOptionsAlistador!: Observable<string[]>;
  optionsAlistador = this.despachoService.miembrosVym
  loading: boolean = false
  
  formAddFactura: FormGroup; /* nombre del formulario en el HTML */

 
   /* title!: string para inicializar si nnecesidad de igual a algo */
  public status!: string; /* sirve para cuando se guarde o no en la base de datos tire un mensaje */
constructor(
  private fb: FormBuilder /* fb es la clase de formbuilder ayuda a crear formulario*/
){
  this.formAddFactura = this.fb.group({
    factura: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern("^[0-9]*$")] ], // cuando hay mas de una validacion color [ ] convirtiendo las validaciones en un Array
    pedido: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern("^[0-9]*$")]],
    nameAlistador: [''],
  })

}

ngOnInit(){
  this.filteredOptionsAlistador = this.nameAlistadorFilter.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.optionsAlistador.filter(option1 => option1.toLowerCase().includes(filterValue));
}

// metodo para el segundo formulario
agregarFactura2(){

  // PARA CAPTURAR UNO DE LOS DATOS QUE YA CAPTURAMOS EN EL INPUT PODEMOS HACER ESTO //
  //onst cliente = this.formAddFactura.get('cliente')?.value//

  const factura: Factura = {
    _id: '',
    facturasId: this.formAddFactura.value.factura,
    numPedido: this.formAddFactura.value.pedido,
    nomAlistador: this.nameAlistadorFilter.value,
    }

    this.loading= true;
    this.despachoService.listaFacturas().pipe(
      switchMap( () => {
        return this.despachoService.saveFactura(factura)})
    ).subscribe(
    response => {
      this.loading = false;
      if(response)
        this.status = 'success';
        this.formAddFactura.reset()
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



}

