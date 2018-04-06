import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SystemGlobalSettingsComponent} from "../components/system-global-settings.component";
import {ValidatedInputComponent} from "../components/validated-input.component";


@NgModule({
  declarations: [
    SystemGlobalSettingsComponent,
    ValidatedInputComponent
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
