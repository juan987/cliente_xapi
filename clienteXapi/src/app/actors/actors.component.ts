import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {RestService} from '../servicios/rest.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
  providers: [RestService]
})
export class ActorsComponent implements OnInit {
  selecionarActor: boolean = false;
  selecionarVerbo: boolean = false;

  title = 'Seleccione un "actor" ';
  title2 = 'Verbs';
  title3 = 'Targets';
      //Variables para servicios rest
  errorMessage: string;
  arrayActors: any[];
  arrayVerbos: any[];
  arrayTargets: any[];

  

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getActores();
    this.getVerbos();
    this.getTargets();
  }

getTargets(){
      this.restService.getTargets()
              .subscribe(
                arrayTargets => {this.arrayTargets = arrayTargets;
                                  //en arrayTargets[].definicion.name = JSON.stringify(arrayTargets[].definicion.name)
                                  
                                  for(let i=0; i<this.arrayTargets.length; i++){
                                    if(this.arrayTargets[i].objeto.definition !== null){
                                       //el stringify es para mostrar todo el objeto name y description, por que el field lenguaje es variable
                                       this.arrayTargets[i].objeto.definition.name = JSON.stringify(this.arrayTargets[i].objeto.definition.name);
                                       this.arrayTargets[i].objeto.definition.description = JSON.stringify(this.arrayTargets[i].objeto.definition.description);
                                    }else{
                                      this.arrayTargets[i].objeto.definition = {name:""};
                                      this.arrayTargets[i].objeto.definition = {description:""};
                                    }
                                    console.log('stringify de definicion en target: ' +i, JSON.stringify(this.arrayTargets[i].objeto.detinition))
                                  }//Fin del for
                                  
                                  console.log('El array de targets tiene:  ', this.arrayTargets.length);
                                  console.log('El array de targets tiene:  ', this.arrayTargets[0].objeto.id)
                               },
                error =>  this.errorMessage = <any>error);
  }

getVerbos(){
      this.restService.getVerbs()
              .subscribe(
                arrayVerbos => {this.arrayVerbos = arrayVerbos;
                                  for(let i=0; i<this.arrayVerbos.length; i++){
                                    //el stringify es para mostrar todo el objeto display, por que el field lenguaje es variable
                                    this.arrayVerbos[i].verbo.display = JSON.stringify(this.arrayVerbos[i].verbo.display);
                                  }
                                  console.log('El array de verbos tiene:  ', this.arrayVerbos.length);
                                  console.log('El array de verbos tiene:  ', this.arrayVerbos[0].verbo.id)
                               },
                error =>  this.errorMessage = <any>error);
  }

getActores(){
      this.restService.getActors()
              .subscribe(
                arrayActors => {this.arrayActors = arrayActors;
                                  console.log('El array de actors tiene:  ', this.arrayActors.length);
                                  console.log('El array de actors tiene:  ', this.arrayActors[0].actor.name)
                               },
                error =>  this.errorMessage = <any>error);
  }

  clickRecargaColeccionActors(){
    //TODO: forzar al server a recargar la coleccion de Actors
  }

  //************************************
  //Emiters
  //Este valor lo paso a reporte-axi al hacer click en una fila de la tabla Actors
  @Output() emitterDelActor = new EventEmitter<string>();

  clickEnTablaActor(datoActor, i){
    this.emitterDelActor.emit(datoActor.actor.name);
    this.selecionarActor= !this.selecionarActor;
  }

  //Este valor lo paso a reporte-axi al hacer click en una fila de la tabla Verbos
  @Output() emitterDelVerb = new EventEmitter<string>();

  clickEnTablaVerbs(datoVerbo, i){
    this.emitterDelVerb.emit(datoVerbo.verbo.id);
    this.selecionarVerbo= !this.selecionarVerbo;
  }

}
