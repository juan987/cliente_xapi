import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';

import { AppComponent } from './app.component';
import { ReporteXapiComponent } from './reporte-xapi/reporte-xapi.component';

//agregado ReactiveFormsModule   para el autocomplete
import { ReactiveFormsModule } from '@angular/forms';
import { ActorsComponent } from './actors/actors.component';
import { ActivityTreeComponent } from './activity-tree/activity-tree.component';

//Para PrimeNg, sin esto no me funcionaba
import {TreeModule, GrowlModule} from 'primeng/primeng';
import {TreeTableModule,SharedModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    ReporteXapiComponent,
    ActorsComponent,
    ActivityTreeComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule ,
    ReactiveFormsModule,
    TreeModule, GrowlModule, TreeTableModule,SharedModule

  ],
  providers: [],
  //bootstrap: [AppComponent]
  bootstrap: [ReporteXapiComponent]
})
export class AppModule { }
