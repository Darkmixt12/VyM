import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';



import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarModule, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { Factura } from '@vym/shared/interface/factura';
import { DespachoService } from '../services/despacho.service';

@Component({
  selector: 'vym-facturas-responsables',
  standalone: true,
  imports: [CommonModule, FacturasResponsablesComponent,MatToolbarModule, MatCardModule, MatFormFieldModule, MatProgressBarModule, MatPaginatorModule,MatSnackBarModule,MatSortModule,MatDialogModule, MatIconModule,MatTableModule,MatInputModule],
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
