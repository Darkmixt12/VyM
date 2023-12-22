import { Injectable } from "@angular/core";
import { Factura } from "../../interfaces/factura";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class DespachoService {
	
	private Global = { url: 'http://192.1.1.149:3700/api/'}
	constructor( private http: HttpClient){
		
	}


	saveFactura(factura : Factura): Observable<Factura> {

	const params = JSON.stringify(factura);
	const headers = new HttpHeaders().set('Content-Type', 'application/json')

	return this.http.post<Factura>(this.Global.url+'facturas-save-check', params, {headers})
	}
}