import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DespachoService } from '@vym/shared/service/DespachoService';
import { estados } from '@vym/shared/classes/notas-credito-helper';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MODULES } from '../../../../../../shared/src/lib/exports/export-modules';


@Component({
  selector: 'vym-add-delete-credito',
  standalone: true,
  imports: [MODULES, MatDialogTitle, MatDialogContent],
  templateUrl: './add-delete-credito.component.html',
  styleUrl: './add-delete-credito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDeleteCreditoComponent {
  private despachoService = inject(DespachoService)
  public formaddCredito: FormGroup;
  public operacion: string = 'Agregar ';
  public id1: string | undefined;
  public estados = estados;
  @Inject(MAT_DIALOG_DATA) 
  public data: any

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public status!: string; /* variable para el mensaje de repetido en la base de datos */
  constructor(
    public dialog: MatDialogRef<AddDeleteCreditoComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,

  ) {
    this.formaddCredito = this.fb.group({
      // Se conecta el archivo css con el archivo HTML  adentro de una etiqueta FORM
      numBoleta: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(5),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      numCliente: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      agente: ['', Validators.required],
      status: [null, Validators.required],
      detalle: [''],
      location: [null, Validators.required],
    });
  }
  
  crearCredito() {
    this.despachoService.saveCredito(this.formaddCredito).subscribe({
      next: () => {
        this.mensajeDeUpdated('agregada');
        this.dialog.close({ success: true });
      },
      error: (e) => (this.status = 'failed'),
    });
  }

  editCredito() {
    this.despachoService
      .updateCredito(this.data._id, this.formaddCredito)
      .subscribe((data: any) => {
        this.mensajeDeUpdated('actualizada');
        this.dialog.close({ success: true });
      });
  }

  mensajeDeUpdated(operacion: string) {
    this._snackBar.open(`Nota de credito  ${operacion} correctamente`, '', {
      duration: 2000,
      verticalPosition: this.verticalPosition,
    });
  }
}
