import { Ncredito } from '@vym/shared/interfaces';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DespachoService } from '@vym/shared/service/DespachoService';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { DeleteCreditoComponent } from '../delete-credito/delete-credito.component';
import { AddDeleteCreditoComponent } from '../add-delete-credito/add-delete-credito.component';


@Component({
  selector: 'vym-notas-credito',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatCardModule, MatFormFieldModule,MatPaginatorModule,MatProgressBarModule,MatTableModule,MatInputModule,MatIconModule],
  templateUrl: './notas-credito.component.html',
  styleUrls: ['./notas-credito.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotasCreditoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['creditoId','client', 'agente','status', 'location', 'description', 'acciones']
  loading: boolean = false;
  public dataSource = new MatTableDataSource<Ncredito>
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    public dialog: MatDialog,
    private despachoService: DespachoService
  
  ){}
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(){
    this.getCreditos();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getCreditos(){
    this.loading = true;
    setTimeout(()=> {
      this.despachoService.listaCreditos().subscribe(
        response => {
          this.loading = false
          if(response.creditosInfo){
            this.dataSource.data = response.creditosInfo
          }
        },
        error => {
          console.log(error)
        }
      )
    }, 700)
  }
  
   openAddEditCredito( element: any){
      console.log(element)
     const dialogRef = this.dialog.open(AddDeleteCreditoComponent, {
       width: '550px', disableClose: true,

       data: {...element}
     })
     dialogRef.afterClosed().subscribe(result => {
       if(result.success){
         this.getCreditos();
       }
     })
   }
  
  // addDeletePersona(id?: number){
  //   const dialogRef = this.dialog.open(BorrarFacturaComponent, {
  //     width: '270px', disableClose: true,
  //     data: {id: id}
  //  })
  
  // }
  
   addDeleteCredito(id?: number){
     const dialogRef = this.dialog.open(DeleteCreditoComponent, {
      width: '270px', disableClose: true,
      data: {id: id}
    })
    dialogRef.afterClosed().subscribe(result => {
     if(result.success){
       this.getCreditos()
    }
  
   });
  }




  

}

 