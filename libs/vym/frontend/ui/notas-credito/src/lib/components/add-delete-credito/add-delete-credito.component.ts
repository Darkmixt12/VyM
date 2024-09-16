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
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MODULES } from '../../../../../../shared/src/lib/exports/export-modules'; //! HACER LOS ALIAS DE TODOS ESTOS HPS
import {
  required,
  pattern,
  minLength,
  maxLength,
} from '../../../../../../shared/src/lib/utils/general-utils';

@Component({
  selector: 'vym-add-delete-credito',
  standalone: true,
  imports: [MODULES, MatDialogTitle, MatDialogContent],
  templateUrl: './add-delete-credito.component.html',
  styleUrl: './add-delete-credito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDeleteCreditoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  private despachoService = inject(DespachoService);
  public dialog = inject(MatDialogRef<AddDeleteCreditoComponent>);

  public status!: string; 
  public estados = estados;
  public id1: string | undefined;
  public formaddCredito!: FormGroup;
  public operacion: string = 'Agregar ';

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.formaddCredito = this.fb.group({
      detalle: [this.data.description],
      agente: [this.data.agente, Validators.required],
      status: [this.data.status, Validators.required],
      location: [this.data.location, Validators.required],
      numBoleta: [
        this.data?.creditoId,
        [required, minLength(4), maxLength(5), pattern('^[0-9]*$')],
      ],
      numCliente: [
        this.data.client,
        [required, minLength(4), maxLength(5), pattern('^[0-9]*$')],
      ],
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
