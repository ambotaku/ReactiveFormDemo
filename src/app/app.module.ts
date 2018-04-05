import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SystemGlobalSettingsComponent} from "../components/system-global-settings.component";


@NgModule({
  declarations: [
    SystemGlobalSettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [SystemGlobalSettingsComponent]
})
export class AppModule { }
