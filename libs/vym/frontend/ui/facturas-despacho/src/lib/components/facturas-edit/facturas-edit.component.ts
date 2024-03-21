import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { DespachoService } from '@vym/shared/service/DespachoService';
import { switchMap } from 'rxjs';
import { Factura } from '@vym/shared/interfaces';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MODULES } from 'libs/vym/frontend/shared/src/lib/exports/export-modules';






// select para numero de mesa
interface mesa {
  value: string;
  viewValue: string;
}
interface alistador {
  value: string;
  viewValue: string;
}

interface chequeador {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'vym-facturas-edit',
  standalone: true,
  imports: [MODULES],
  templateUrl: './facturas-edit.component.html',
  styleUrl: './facturas-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasEditComponent {



  public loading : boolean = false;
  despachoService = inject(DespachoService)
  private miembrosVyM = this.despachoService.miembrosVyMArray
// selec del numero de mesa
  mesas: mesa[] = [
    {value: 'MESA 1', viewValue: '1'},
    {value: 'MESA 2', viewValue: '2'},
    {value: 'MESA 3', viewValue: '3'},

  ];
  // AUTO SELECT INTELIGENTE DEL FORM ALISTADOR
  alistadores: alistador[] = this.miembrosVyM

    // AUTO SELECT INTELIGENTE DEL FORM ALISTADOR
  chequeadores: chequeador[] = this.miembrosVyM;
  
  maxDate: Date;

  form!: FormGroup;  // formulario del HTML
  id: number | undefined; // variable donde se asigna la ID que pasa por el DIALOG
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // posicion donde se va a monstrar el mensaje al eliminar algo o editar
  constructor(
    private dateAdapter: DateAdapter<any>,
    public dialog: MatDialogRef<FacturasEditComponent>, // selecciona en si el componente donde se abre la ventanita al dar click en el boton //
    private fb: FormBuilder, // variable para creacion de formularios
    private _snackBar: MatSnackBar, // variable para mensajes emergentes
    
    /* este form sirve para llenar los campos automatica en el EDITAR para guiar un poco al usuario en su uso*/
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.maxDate = new Date();
      this.form = this.fb.group({
        cliente: [data.id.client],
        pushMoney: [data.id.pushMoney],
        fechaReg: [data.id.fechaReg],
        nameAlistador: [data.id.nomAlistador],
        nameChequeador: [data.id.nomChequeador],
        numMesa: [data.id.numMesa],
        fechaAlistado: [data.id.fechaAlistado],
        horaChequeo: [data.id.horaChequeo],
        fechaChequeo: [data.id.fechaChequeo]
        
        /* FORMULARIO PARA EDIT */
      })
  
      // JALA EL NUMERO DE LA FACTURA PARA AGREGARLA EN HTML 
      this.id = data.id.facturasId;
      
    //console.log(this.id)
  }


  getFactura(id: string){
    this.despachoService.getFactura(id).subscribe(
      response =>{
        if(response){
          console.log(response)
        }
      }
      )

  }

  updatedFactura(id: any){
    const factura: Factura ={
      _id: this.form.value._id,
      facturasId: this.form.value.facturasId,
      numPedido: this.form.value.numPedido,
      client: this.form.value.cliente,
      fechaReg: this.form.value.fechaReg,
      pushMoney: this.form.value.pushMoney,
      nomAlistador: this.form.value.nameAlistador,
      nomChequeador: this.form.value.nameChequeador,
      numMesa: this.form.value.numMesa,
      fechaAlistado: this.form.value.fechaAlistado,
      fechaChequeo: this.form.value.fechaChequeo,
      horaChequeo: this.form.value.horaChequeo

    }
    this.loading= true;
    this.despachoService.listaFacturas().pipe(
      switchMap( () => {
        return this.despachoService.updateFactura(this.data.id._id, factura)})
    )
    
    .subscribe((data:any) => {
    if(data){
      this.dialog.close({success: true});
      this.mensajeDeUpdated();
    }else{
      this.loading = false;
      this.dialog.close({success: false});
    }
    })

 
  }

  mensajeDeUpdated(){

      this._snackBar.open('Factura Editada con Exito', '', {
        duration: 2000,
        verticalPosition: this.verticalPosition
      });
  }
  
  btncancelar(){
    this.dialog.close({success: false});
  }

  addEditPersona(){
}



}

