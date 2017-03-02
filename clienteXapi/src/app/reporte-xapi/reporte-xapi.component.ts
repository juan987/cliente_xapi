import { Component, OnInit, Input, Output } from '@angular/core';
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
//Bind con el dato clickado en el component activity-tree
actividadClickadaEnActivityTree: string;




    title = 'API de informes con Xapi';
    //Variables para servicios rest
    errorMessage: string;
    learningReport1: any[];
  //Variables de autocomplete
  searchForm: FormGroup;
  results: Observable<any>;
  datosForm: DatosForm;
  searchFormVerbos: FormGroup;
  resultverbos: Observable<any>;

  


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
      this.activarAutocompleteDeNombre()
      this.activarAutocompleteDeVerbos()
    //***********************************
    // FIN de Autocomplete
    //***********************************
      this.datosForm = new DatosForm("","","","","");
      
    }//Fin del constructor

    ngOnInit() {
    }

    //******************************************
    //Emitters
    //******************************************
    //Emiter recibido de activity-tree.component
    datoDeTreeComponent(actividad: string) {
      this.datosForm.activity = actividad;
      console.log('La actividad clickada en activity-tree component es: ', actividad);
    }

    //Emiter recibido con el dato del Actor
    emitterDelActor(datoActor: string) {
      this.datosForm.name = datoActor;
      console.log('El Actor clickado en actors.component es: ', datoActor);
    }

    //Emiter recibido con el dato del Verbo
    emitterDelVerb(datoVerbo: string) {
      this.datosForm.verb = datoVerbo;
      console.log('El Verbo clickado en actors.component es: ', datoVerbo);
    }

    //******************************************
    //Fin de Emitters
    //******************************************

    clickGeneraInforme(): void{
      console.log("Click en el boton generar informe");
      console.log('Los datos de busqueda son: ', this.datosForm.toString())
      this.getReport_1(this.datosForm);
      //reseteo los campos del formulario
      /*this.datosForm.name = "";
      this.datosForm.verb = "";
      this.datosForm.activity = "";
      this.datosForm.date1 = "";
      this.datosForm.date2 = "";*/

      //Quito el form reset del boton de submit linea 98
      //(click)="clickGeneraInforme(); form.reset()"

      //quito el muestraBotonesModAndDel del boton reset
      //(click)="muestraBotonesModAndDel = true; learningReport1 = null"


      //this.datosForm = null;
      //this.datosForm = new DatosForm("","","","","");
    }

    clickReset(){
      this.learningReport1 = null;  
      this.datosForm = null; 
      this.datosForm = new DatosForm("","","","","");
    }

    //Metodos relacionados con http
    getReport_1(datosForm: DatosForm):void {
      //TODO llamar al server con los parametros para obtener el tipo de reporte solicitado
          this.restService.getLearningReport1(datosForm)
                     .subscribe(
                       learningReport1 => {this.learningReport1 = learningReport1,
                                          console.log('El array de reports tiene:  ', this.learningReport1.length)},
                       error =>  this.errorMessage = <any>error);
    }


    clickGuardarNombre(result: any):void {
      //this.datosForm.name = result.actor.name;
      this.datosForm.name = result._id;
      this.activarAutocompleteDeNombre()
    }

    clickGuardarVerbo(resultverb: any):void {
      this.datosForm.verb = resultverb.verbo;
      this.activarAutocompleteDeVerbos()
    }

    activarAutocompleteDeNombre(){
             this.searchForm = this.fb.group({
            'searchField': ['']
        });

        var ctrl = this.searchForm.controls['searchField']

        this.results = ctrl.valueChanges
                    .debounceTime(500)
                    .distinctUntilChanged()
                    //.switchMap(fieldValue => this.http.get(`http://localhost:3001/api/search?term=${fieldValue}`))
                    .switchMap(fieldValue => 
                        //console.log('en switch map, valor de fieldvalue: ' +fieldValue);
                        this.http.get(`http://localhost:3000/actor/autocomplete/` +fieldValue))
                    .map(res => res.json());
    }

    activarAutocompleteDeVerbos(){
             this.searchFormVerbos = this.fb.group({
            'searchFieldVerbos': ['']
        });

        var ctrl = this.searchFormVerbos.controls['searchFieldVerbos']

        this.resultverbos = ctrl.valueChanges
                    .debounceTime(500)
                    .distinctUntilChanged()
                    //.switchMap(fieldValue => this.http.get(`http://localhost:3001/api/search?term=${fieldValue}`))
                    .switchMap(fieldValue => 
                        //console.log('en switch map, valor de fieldvalue: ' +fieldValue);
                        this.http.get(`http://localhost:3000/actor/autocompleteverbos/` +fieldValue))
                    .map(res => res.json());
    }

}// fin de ReporteXapiComponent
