import { Component, OnInit } from '@angular/core';
// Add the RxJS Observable operators. para gestionar HTTP
import './rxjs-operators';
import {DatosForm} from '../modelo-datos/datos-form';
import {RestService} from '../servicios/rest.service';

//Para gestionar el autocomplete
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http, Response } from '@angular/http';
//Fin autocomplete

@Component({
  selector: 'app-reporte-xapi',
  templateUrl: './reporte-xapi.component.html',
  styleUrls: ['./reporte-xapi.component.css'],
  providers: [RestService]
})
export class ReporteXapiComponent implements OnInit {
    title = 'API de informes';
    //Variables para servicios rest
    errorMessage: string;
    learningReport1: any[];
  //Variables de autocomplete
  searchForm: FormGroup;
  results: Observable<any>;
  datosForm: DatosForm;

  


    constructor(private restService: RestService,
                private fb: FormBuilder, 
                private http: Http) { 
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
      this.datosForm = new DatosForm("","","","");
    }//Fin del constructor

    ngOnInit() {
    }

    clickGeneraInforme(): void{
      console.log("Click en el boton generar informe");
      console.log('Los datos de busqueda son: ', this.datosForm.toString())
      this.getReport_1();
    }

    //Metodos relacionados con http
    getReport_1():void {
      //TODO llamar al server con los parametros para obtener el tipo de reporte solicitado
          this.restService.getLearningReport1()
                     .subscribe(
                       learningReport1 => {this.learningReport1 = learningReport1,
                                          console.log('El array de reports tiene:  ', this.learningReport1.length)},
                       error =>  this.errorMessage = <any>error);
    }


    clickGuardarNombre(result: any):void {
      this.datosForm.name = result.actor.name;

    }


}// fin de ReporteXapiComponent
