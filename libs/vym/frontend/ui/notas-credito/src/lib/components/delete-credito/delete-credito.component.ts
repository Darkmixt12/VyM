import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespachoService } from '@vym/shared/service/DespachoService';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';



@Component({
  selector: 'vym-delete-credito',
  standalone: true,
  imports: [CommonModule,MatDialogModule,ReactiveFormsModule,MatTableModule,MatInputModule],
  templateUrl: './delete-credito.component.html',
  styleUrl: './delete-credito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCreditoComponent {
  formDelete: FormGroup;
  idDelete: string;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private despachoService: DespachoService,
    private _snackBar: MatSnackBar,
    private readonly fb: FormBuilder,
    public dialog: MatDialogRef<DeleteCreditoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    // importar el form buildp ara poder usar los form*/
    this.formDelete = this.fb.group({
      // es el input //
      deletePasswordform: [data.id.deletePassword]
    })

    this.idDelete = data.id;
  };


  deleteCredito() {
    // si el valor del form .deletepasswordform es == a la contraseña entonces realiza el delete 
if (this.formDelete.value.deletePasswordform == '6985') {
    // idDelete contiene el ID_ del objeto en la base de datos y asi lo borra
this.despachoService.deleteCredito(this.idDelete).subscribe(() => {
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













