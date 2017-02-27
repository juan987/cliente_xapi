import { Component, OnInit } from '@angular/core';
import {RestService} from '../servicios/rest.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
  providers: [RestService]
})
export class ActorsComponent implements OnInit {
  title = 'Datos de Actors';
      //Variables para servicios rest
  errorMessage: string;
  arrayActors: any[];

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getActores();
  }

  getActores(){
      this.restService.getActors()
              .subscribe(
                arrayActors => {this.arrayActors = arrayActors;
                                  console.log('El array de reports tiene:  ', this.arrayActors.length);
                                  console.log('El array de reports tiene:  ', this.arrayActors[0].actor.name)
                               },
                error =>  this.errorMessage = <any>error);
  }

  clickRecargaColeccionActors(){
    //TODO: forzar al server a recargar la coleccion de Actors
  }



}
