import { Component, OnInit } from '@angular/core';
import {RestService} from '../servicios/rest.service';

@Component({
  selector: 'app-activity-tree',
  templateUrl: './activity-tree.component.html',
  styleUrls: ['./activity-tree.component.css'],
  providers: [RestService]
})
export class ActivityTreeComponent implements OnInit {
  title = 'Arbol de actividades';
  arbolJson: {};
  errorMessage: string;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getArbolActividades();
  }


getArbolActividades(){
      this.restService.getArbolDeActividades()
              .subscribe(
                arbolJson => {this.arbolJson = arbolJson;
                                  console.log('El arbol tiene:  ', this.arbolJson, " componentes");
                                  console.log('El array de actors tiene:  ', this.arbolJson)
                               },
                error =>  this.errorMessage = <any>error);
  }


}
