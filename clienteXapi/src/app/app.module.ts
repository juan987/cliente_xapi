import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';

import { AppComponent } from './app.component';
import { ReporteXapiComponent } from './reporte-xapi/reporte-xapi.component';

//agregado ReactiveFormsModule   para el autocomplete
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ReporteXapiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule ,
    ReactiveFormsModule
  ],
  providers: [],
  //bootstrap: [AppComponent]
  bootstrap: [ReporteXapiComponent]
})
export class AppModule { }