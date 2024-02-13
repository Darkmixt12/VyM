import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Factura } from '@vym/shared/interface/factura';

@Injectable({ providedIn: 'root' })
export class DespachoService {
  private Global = { url: 'http://192.1.1.149:3700/api/' };
  constructor(private http: HttpClient) {}

//! CAMBIAR AQUI EL NOMBRE PARA AFECTAR TODA LA APLICACION
public miembrosVym: string[] = ['Alejandro', 'Brandon','Eduardo', 'Fernando','Guillermo','Jimmy', 'Jaime','Javier','Marlon','Nahun', 'Kenneth Quiroz','Luis','Jair','Jordan','Luis Pastel','Richard','Ricardo','Stalin'];
public miembrosVyMArray = [
    {value: 'Alejandro', viewValue: 'Alejandro'},
    {value: 'Brandon', viewValue: 'Brandon'},
    {value: 'Eduardo', viewValue: 'Eduardo'},
    {value: 'Franco', viewValue: 'Franco'},
    {value: 'Fernando', viewValue: 'Fernando'},
    {value: 'Guillermo', viewValue: 'Guillermo'},
    {value: 'Jair', viewValue: 'Jair'},
    {value: 'Javier', viewValue: 'Javier'},
    {value: 'Jimmy', viewValue: 'Jimmy'},
    {value: 'Jaime', viewValue: 'Jaime'},
    {value: 'Jordan', viewValue: 'Jordan'},
    {value: 'Kenneth Quiroz', viewValue: 'Kenneth Quiroz'}, 
    {value: 'Luis Pastel', viewValue: 'Luis Pastel'},
    {value: 'Marlon', viewValue: 'Marlon'},
    {value: 'Nahun', viewValue: 'Nahun'},
    {value: 'Richard', viewValue: 'Richard'},
    {value: 'Ricardo', viewValue: 'Ricardo'},
    {value: 'Stalin', viewValue: 'Stalin'},
  ];


  saveFactura(factura: Factura): Observable<Factura> {
    const params = JSON.stringify(factura);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Factura>(
      this.Global.url + 'facturas-save-check',
      params,
      { headers }
    );
  }

  listaFacturas(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.Global.url+'facturas-list', { headers})
  }
}
