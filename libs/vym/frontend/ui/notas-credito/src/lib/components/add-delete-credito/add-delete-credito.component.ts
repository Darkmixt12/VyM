import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DespachoService } from '@vym/shared/service/DespachoService';
import { Ncredito } from '@vym/shared/interfaces';
import { estado, estados } from "@vym/shared/classes/notas-credito-helper";

import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'vym-add-delete-credito',
  standalone: true,
  imports: [CommonModule,MatDialogModule,ReactiveFormsModule,MatTableModule,MatInputModule,MatSelectModule],
  templateUrl: './add-delete-credito.component.html',
  styleUrl: './add-delete-credito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDeleteCreditoComponent implements OnInit{


  public formaddCredito: FormGroup;
  public operacion : string = 'Agregar '
  public id : string | undefined;
  public id1 : string | undefined;
  public estados = estados


    verticalPosition: MatSnackBarVerticalPosition = 'top';
  public status!: string; /* variable para el mensaje de repetido en la base de datos */
  constructor(
    public dialog: MatDialogRef<AddDeleteCreditoComponent>, private fb: FormBuilder, private despachoService: DespachoService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.formaddCredito = this.fb.group({ // Se conecta el archivo css con el archivo HTML  adentro de una etiqueta FORM
      numBoleta: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5),Validators.pattern("^[0-9]*$")]],
      numCliente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(7),Validators.pattern("^[0-9]*$")]],
      agente: ['',Validators.required,],
      status: [null, Validators.required],
      detalle: [''],
      location: [null, Validators.required]
    })
    this.id = data.id
    console.log(this.id)

  }

ngOnInit() {
  this.esEditar(this.id)
}

esEditar(id: string | undefined) {
  if(id !== undefined){
    this.operacion = 'Editar'
    this.getCredito(id);
  }
}

getCredito(id: string){
  
 this.despachoService.getCreditoId(id).subscribe((data:any) => {
  console.log(data)
  console.log(data.credito.client)
  this.formaddCredito.patchValue({
    numBoleta: data.credito.creditoId,
    agente: data.credito.agente,
    numCliente: data.credito.client,
    status: data.credito.status,
    detalle: data.credito.description,
    location: data.credito.location,
    

  })

 })
}
  
btncancelar(){
  this.dialog.close({success: false});
}

addEditCredito2(formaddCredito: any) {
  if(formaddCredito.invalid) return;

  const idFactura = this.id
  console.log('buenas tardes',idFactura)
  const credito: Ncredito = {
    _id: this.formaddCredito.value._id,
    creditoId: this.formaddCredito.value.numBoleta,
    client: this.formaddCredito.value.numCliente,
    agente: this.formaddCredito.value.agente,
    status: this.formaddCredito.value.status,
    description: this.formaddCredito.value.detalle,
    location: this.formaddCredito.value.location,
    creditoRegDia_db: this.formaddCredito.value.creditoRegDia_db
  }

  if(idFactura == 'null' || 'undefined'){
    // es agregar

    this.despachoService.saveCredito(credito).subscribe(
      response => {
        if(response)
        console.log(credito)
        this.mensajeDeUpdated('agregada');
      },
      error => {
        if(error){
          console.log(error)
          this.status = 'failed'
        }
  
      }
  )
  }if(idFactura !== 'null' || 'undefined'){
    // es editar
    this.despachoService.updateCredito(idFactura, credito).subscribe((data:any) =>{
      console.log('soy el credito',credito)
      this.mensajeDeUpdated('actualizada');
    })
  this.dialog.close({success: true});
}

}

mensajeDeUpdated(operacion: string){

  this._snackBar.open(`Nota de credito  ${operacion} correctamente`, '', {
    duration: 2000,
    verticalPosition: this.verticalPosition
  });
}














}


