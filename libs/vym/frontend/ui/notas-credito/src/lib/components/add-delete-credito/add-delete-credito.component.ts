import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DespachoService } from '@vym/shared/service/DespachoService';
import { Ncredito } from '@vym/shared/interfaces';
import { estado, estados } from '@vym/shared/classes/notas-credito-helper';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'vym-add-delete-credito',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-delete-credito.component.html',
  styleUrl: './add-delete-credito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDeleteCreditoComponent {
  public formaddCredito: FormGroup;
  public operacion: string = 'Agregar ';
  public id1: string | undefined;
  public estados = estados;

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public status!: string; /* variable para el mensaje de repetido en la base de datos */
  constructor(
    public dialog: MatDialogRef<AddDeleteCreditoComponent>,
    private fb: FormBuilder,
    private despachoService: DespachoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
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

   ngOnInit() {
    console.log(this.data)
   }

  // esEditar(id: string | undefined) {
  //   if (id) {
  //     this.operacion = 'Editar';
  //     this.getCredito(id);
  //   }
  // }

  // getCredito(id: string) {
  //   this.despachoService.getCreditoId(id).subscribe((data: any) => {
  //     console.log(data);
  //     console.log(data.credito.client);
  //     this.formaddCredito.patchValue({
  //       numBoleta: data.credito.creditoId,
  //       agente: data.credito.agente,
  //       numCliente: data.credito.client,
  //       status: data.credito.status,
  //       detalle: data.credito.description,
  //       location: data.credito.location,
  //     });
  //   });
  // }

  btncancelar() {
    this.dialog.close({ success: false });
  }

  crearCredito() {
    this.despachoService.saveCredito(this.formaddCredito).subscribe(
      (response) => {
        if (response) console.log(this.formaddCredito);
        this.mensajeDeUpdated('agregada');
      },
      (error) => {
        this.status = 'failed';
      }
    );
  }

  editCredito() {
    this.despachoService
      .updateCredito(this.data.id, this.formaddCredito)
      .subscribe((data: any) => {
        this.mensajeDeUpdated('actualizada');
      });
    this.dialog.close({ success: true });
  }

  mensajeDeUpdated(operacion: string) {
    this._snackBar.open(`Nota de credito  ${operacion} correctamente`, '', {
      duration: 2000,
      verticalPosition: this.verticalPosition,
    });
  }
}
