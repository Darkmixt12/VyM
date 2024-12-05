import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { Factura } from '@vym/shared/interface/factura';
import { DespachoService } from '@vym/shared/service/DespachoService';

import { MODULES } from 'libs/vym/frontend/shared/src/lib/exports/export-modules';


@Component({
  selector: 'vym-facturas-responsables',
  standalone: true,
  imports: [MODULES,FacturasResponsablesComponent],
  templateUrl: './facturas-responsables.component.html',
  styleUrl: './facturas-responsables.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasResponsablesComponent implements AfterViewInit, OnInit {


  filterPost = ''
  displayedColumns: string[] = ['facturasId', 'numMesa','nomAlistador','nomChequeador', 'fechaAlistado','fechaChequeo', 'horaChequeo'];
  dataSource = new MatTableDataSource<Factura> /* se necesita para hacer la tabla */

  loading: boolean = false /* loading bar */
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    /* inyector de  dependencias */
    constructor(
      public dialog: MatDialog,
      private despachoService: DespachoService,
      private _snackBar: MatSnackBar
  
    ){}

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    ngOnInit() {
      this.getFacturas();
    } /* no olvidar llamarl o bien NGONINIT */
   
    getFacturas(){
      this.loading = true
      setTimeout(()=>{
        this.despachoService.listaFacturas().subscribe(
          response => {
            this.loading = false
            if(response.facturasInfo){
              this.dataSource.data = response.facturasInfo /* para que se llenen los campos */
  
            }
          },
          error => {
            console.log(error);
          }
      )
      }, 700 )
  
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
}
