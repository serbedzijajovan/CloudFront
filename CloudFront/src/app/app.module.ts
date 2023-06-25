import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {AppRoutingModule} from "./app-routing.module";
import {NgToastModule} from "ng-angular-popup";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CoreModule,
    NgToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
