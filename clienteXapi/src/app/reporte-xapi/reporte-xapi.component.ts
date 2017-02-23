import { Component, OnInit } from '@angular/core';
// Add the RxJS Observable operators. para gestionar HTTP
import './rxjs-operators';

//Para gestionar el autocomplete
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http, Response } from '@angular/http';
//Fin autocomplete

@Component({
  selector: 'app-reporte-xapi',
  templateUrl: './reporte-xapi.component.html',
  styleUrls: ['./reporte-xapi.component.css']
})
export class ReporteXapiComponent implements OnInit {
    title = 'API de informes';
  //Variables de autocomplete
  searchForm: FormGroup;
  results: Observable<any>;


    constructor(private fb: FormBuilder, private http: Http) { 
    //*******************************************************************************************
    // Autocomplete
    //Como en : http://venckicode.blogspot.com.es/2016/06/type-ahead-search-with-angular2-and.html
    //Y como en http://blog.ng-book.com/the-ultimate-guide-to-forms-in-angular-2/
    //para los temas de 
    // ReactiveFormsModule gives us directives like formControl and ngFormGroup
    //******************************************************************************************* 
        this.searchForm = this.fb.group({
            'searchField': ['']
        });

        //var ctrl = this.searchForm.controls.searchField;
        var ctrl = this.searchForm.controls['searchField']
        //var ctrl = this.searchForm.controls.searchField;

        this.results = ctrl.valueChanges
                    .debounceTime(500)
                    .distinctUntilChanged()
                    //.switchMap(fieldValue => this.http.get(`http://localhost:3001/api/search?term=${fieldValue}`))
                    .switchMap(fieldValue => 
                        //console.log('en switch map, valor de fieldvalue: ' +fieldValue);
                        this.http.get(`http://localhost:3000/actor/autocomplete/` +fieldValue))
                    .map(res => res.json());
    //***********************************
    // FIN de Autocomplete
    //***********************************
    }//Fin del constructor

    ngOnInit() {
    }

    clickGeneraInforme(): void{
      console.log("Click en el boton generar informe");
      this.getReport();
    }

    //Metodos relacionados con http
    getReport() {
      //TODO llamar al server con los parametros para obtener el tipo de reporte solicitado
    }

}// fin de ReporteXapiComponent
