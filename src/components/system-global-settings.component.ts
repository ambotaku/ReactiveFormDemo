import {Component} from '@angular/core';
import {GlobalSettings, SystemGlobalService} from "../app/system-global-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

// regex for checking IP validity
const IP_VALID = /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])$/;

function netmaskValid({value}: FormControl): {[key: string]: any} {
  let matched: string;
  let split: string[];
  if(!value) {
    return null;
  }

  let ipValid = IP_VALID.exec(value);
  if (!ipValid) {
    return {
      netmaskValid: {
        error: 'no valid IP address format'
      }
    }
  }

  let address = ipValid.slice(1)
    .map(part => parseInt(part, 10))
    .reduce((sum, part) => Math.abs(sum * 256) + part);

  if (address & (~address >> 1)) {
    return {
      netmaskValid: {
        error: 'not a valid netmask'
      }
    }
  }
}

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
    get netmask() { return this.settingsGroup.controls['netmask']; }
    get nameServer() { return this.settingsGroup.controls['nameServer']; }
    get ntpServer() { return this.settingsGroup.controls['ntpServer']; }

    private ipValidation = Validators.pattern(IP_VALID);

    constructor(private systemGlobalService: SystemGlobalService, fb: FormBuilder)
    {
      // build form control hierarchy
      this.settingsGroup = fb.group({
        hostname: ['', [Validators.required, Validators.minLength(1)]],
        gateway: ['', [Validators.required, this.ipValidation]],
        netmask: ['', [Validators.required, netmaskValid]],
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
