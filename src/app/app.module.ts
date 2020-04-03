import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GoodbyeComponent} from "./goodbye.component";
import {HelloComponent} from "./hello.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [HelloComponent, GoodbyeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
