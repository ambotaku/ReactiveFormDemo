import {Component} from '@angular/core';
import {GlobalSettings, SystemGlobalService} from "../app/system-global-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// regex for checking IP validity
const IP_VALID = /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])$/;

@Component({
     selector: 'system-global-settings',
     templateUrl: './system-global-settings.component.html',
     styleUrls: ['./system-global-settings.component.css'],
     providers: [SystemGlobalService]
 })
export class SystemGlobalSettingsComponent
{
    changedSettings: GlobalSettings; // monitor form changes
    updatedSettings: GlobalSettings; // return updated form data
    settingsGroup: FormGroup;        // form control hierarchy

    // getters for all form controls
    get hostname() { return this.settingsGroup.controls['hostname']; }
    get gateway() { return this.settingsGroup.controls['gateway']; }
    get nameServer() { return this.settingsGroup.controls['nameServer']; }
    get ntpServer() { return this.settingsGroup.controls['ntpServer']; }

    private ipValidation = Validators.pattern(IP_VALID);

    constructor(private systemGlobalService: SystemGlobalService, fb: FormBuilder)
    {
      // build form control hierarchy
      this.settingsGroup = fb.group({
        hostname: fb.control('', [Validators.required, Validators.minLength(1)]),
        gateway: fb.control('', [Validators.required, this.ipValidation]),
        nameServer: fb.control('',[Validators.required, this.ipValidation]),
        ntpServer: fb.control('', [Validators.required, Validators.minLength(1)]),
      });

      // observe data to edit
      this.systemGlobalService.globalSettings$.subscribe((settings => {
        this.settingsGroup.setValue(settings);
      }));

      // observe updated form data
      this.settingsGroup.valueChanges.subscribe(settings => this.changedSettings = settings);
    }

    // show updated data
    applyClicked(event): void
    {
      this.updatedSettings = this.changedSettings;
    }
}
