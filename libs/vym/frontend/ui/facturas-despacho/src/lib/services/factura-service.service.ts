import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Factura } from '../interfaces/factura';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private Global = {
    url: 'https://localhost:4200/api/',
  };

  private url: string = this.Global.url;
  #http = inject(HttpClient);

  public saveFactura(factura: Factura): Observable<Factura> {
    const params = JSON.stringify(factura);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.#http.post<Factura>(this.url + 'facturas-save-check', params, {
      headers,
    });
  }
}
