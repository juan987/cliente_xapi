import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReporteXapiComponent } from './reporte-xapi/reporte-xapi.component';

@NgModule({
  declarations: [
    AppComponent,
    ReporteXapiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  //bootstrap: [AppComponent]
  bootstrap: [ReporteXapiComponent]
})
export class AppModule { }
