import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Factura } from '../interfaces/factura';
import { Ncredito } from '../interfaces';


@Injectable({ providedIn: 'root' })
export class DespachoService {
  private Global = { url: 'http://localhost:3700/api/' };
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

  listaFacturas(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.Global.url+'facturas-list', { headers})
  }

  listaCreditos(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    
    return this.http.get(this.Global.url+'creditos-list', { headers})
}

  deleteCredito(id: any): Observable<void>{
  return this.http.delete<void>(this.Global.url+'creditos-deleted/'+id)
}

  getCreditoId(id: string): Observable<Ncredito>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<Ncredito>(this.Global.url+'credito/'+id, {headers})
  }

  saveCredito(credito:Ncredito): Observable<any>{
        
    const params = JSON.stringify(credito)
    const headers = new HttpHeaders().set('Content-Type','application/json'); /* oara que la informacion vaya en ese formato */

    return this.http.post(this.Global.url+'credito-save-check', params, {headers:headers});
}

  updateCredito(id: string | undefined, notacredito: Ncredito): Observable<void>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put<void>(this.Global.url+'creditos-updated/'+id, notacredito, {headers: headers})
}

updateFactura(id: string, factura: Factura): Observable<void>{
  const headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.put<void>(this.Global.url+'facturas-updated/'+id, factura, {headers})
}

getFactura(_id: string): Observable<Factura>{
  const headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.get<Factura>(this.Global.url+'facturas/'+_id, {headers})
}

deleteFactura(id: any): Observable<void>{
  return this.http.delete<void>(this.Global.url+'facturas-deleted/'+id)
}
}
