import { Component, OnInit } from '@angular/core';
import {RestService} from '../servicios/rest.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
  providers: [RestService]
})
export class ActorsComponent implements OnInit {
  title = 'Actors';
  title2 = 'Verbs';
      //Variables para servicios rest
  errorMessage: string;
  arrayActors: any[];
  arrayVerbos: any[];

  

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getActores();
    this.getVerbos();
  }

  getVerbos(){
      this.restService.getVerbs()
              .subscribe(
                arrayVerbos => {this.arrayVerbos = arrayVerbos;
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



}
