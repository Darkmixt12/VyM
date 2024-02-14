import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Factura } from '@vym/shared/interface/factura';




import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { DespachoService } from '@vym/shared/service/DespachoService';







@Component({
  selector: 'vym-facturas',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatCardModule, MatFormFieldModule, MatProgressBarModule, MatPaginatorModule,MatSnackBarModule,MatSortModule,MatDialogModule, MatIconModule,MatTableModule,MatInputModule],
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturasComponent implements OnInit, AfterViewInit {

  filterPost = ''
  displayedColumns: string[] = ['facturasId','numPedido','cliente', 'fechaReg', 'fechaRegDia_db', 'acciones' ];
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
  
    // addEditPersona(id?: number){
    //   const dialogRef = this.dialog.open(EditPersonaComponent, {
    //     width: '500px', disableClose: true,
    //     data: {id: id, id2: id}  /* esta es nuestra badera para saber si el usuario esta editando y que elemento */
  
        
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result.success){
    //       this.getFacturas()
    //     }
    //     });
    //     /* despues de cerrarse suscribase a un evento */
  
    // }
  
    // addDeletePersona(id?: number){
    //   const dialogRef = this.dialog.open(BorrarFacturaComponent, {
    //     width: '270px', disableClose: true,
    //     data: {id: id}
  
    // }); 
    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result.success){
    //       this.getFacturas()
    //     }
  
    //   });
  
    // }
  
    // deleteFactura(id:any){
    //     this.despachoService.deleteFactura(id).subscribe(() =>{
    //       this.getFacturas();
    //       this.mensajeDeleteExito();
    //     })
    // }
  
    mensajeDeleteExito(){
  
      this._snackBar.open('Factura Eliminada con Exito', '', {
        duration: 2000,
        verticalPosition: this.verticalPosition
      });
    }
  



















}

