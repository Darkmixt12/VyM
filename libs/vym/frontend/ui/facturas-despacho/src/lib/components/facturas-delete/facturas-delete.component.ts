import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespachoService } from '@vym/shared/service/DespachoService';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'vym-facturas-delete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule],
  templateUrl: './facturas-delete.component.html',
  styleUrl: './facturas-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasDeleteComponent {


  formDelete!: FormGroup; /* este es el nombre del form del HTMP GROUP */
  idDelete: number; /* se iguala a la _Id de la factura para que luego la reciba el DELETEFACTURA() y elimine*/
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private despachoService: DespachoService,
    private _snackBar: MatSnackBar,
    private readonly fb: FormBuilder,
    public dialog: MatDialogRef<FacturasDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    /* importar form builder para poder usar los form*/
    this.formDelete = this.fb.group({
      /* deletePasswordform es el input*/
      deletePasswordform: [data.id.deletePassword],
    });

    this.idDelete = data.id;
  }

  deleteFactura() {
          // si el valor del form .deletepasswordform es == a la contraseña entonces realiza el delete 
    if (this.formDelete.value.deletePasswordform == '1234') {
          // idDelete contiene el ID_ del objeto en la base de datos y asi lo borra
      this.despachoService.deleteFactura(this.idDelete).subscribe(() => {
        this.mensajeDeleteExito();
        this.dialog.close({ success: true });
      });
    }else{
      this.mensajeDeleteError();
    }
  }

  mensajeDeleteExito() {
    this._snackBar.open('Factura Eliminada con Exito', '', {
      duration: 2000,
      verticalPosition: this.verticalPosition,
    });
  }

  mensajeDeleteError() {
    this._snackBar.open('ERROR de Contraseña Digite de nuevo.', '', {
      duration: 2000,
      verticalPosition: this.verticalPosition,
    });
  }
  cancelar() {
    this.dialog.close({ success: false });
  }

  addDeletePersona1() {}

}






