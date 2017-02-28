import { Injectable } from '@angular/core';
import {DatosForm} from '../modelo-datos/datos-form';


import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class RestService {

  private urlPost = 'http://localhost:3000/reporte1';  // URL para get el json con la lista de peliculas
  private urlGet = 'http://localhost:3000/collection/actor';  // URL para get el json con la lista de peliculas
  private urlGet2 = 'http://localhost:3000/collection/verb';  // URL para get el json con la lista de peliculas
  private urlGet3 = 'http://localhost:3000/collection/target';  // URL para get el json con la lista de peliculas

  constructor(private http: Http) { }

  getLearningReport1(datosForm: DatosForm): Observable<any[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlPost, datosForm, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }



  getActors(): Observable<any[]>{
    return this.http.get(this.urlGet)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getVerbs(): Observable<any[]>{
    return this.http.get(this.urlGet2)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getTargets(): Observable<any[]>{
    return this.http.get(this.urlGet3)
                    .map(this.extractData)
                    .catch(this.handleError);
  }



//*******************************************************************************************
  private extractData(res: Response) {
    console.log("En RestService service, la response es:   " +res);
    let datos = res.json();
    console.log("En RestService service, el body es   " +datos);
    return datos;    
  }
  
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}//Fin de RestService
