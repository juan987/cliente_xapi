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

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getActores();
  }

  getActores(){
    
  }



}
