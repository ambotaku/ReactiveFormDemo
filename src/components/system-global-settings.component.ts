import {Component, Input} from '@angular/core';
import {GlobalSettings, SystemGlobalService} from "../app/system-global-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
     selector: 'system-global-settings',
     templateUrl: './system-global-settings.component.html',
     styleUrls: ['./system-global-settings.component.css'],
     providers: [SystemGlobalService]
 })
export class SystemGlobalSettingsComponent
{
    private static REGEX = /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])$/;
    @Input() initialSetup = false;

    changedSettings: GlobalSettings;
    updatedSettings: GlobalSettings;
    settingsGroup: FormGroup;
    otherServerIP: string;

    get hostname() { return this.settingsGroup.controls['hostname']; }
    get gateway() { return this.settingsGroup.controls['gateway']; }
    get nameServer() { return this.settingsGroup.controls['nameServer']; }
    get ntpServer() { return this.settingsGroup.controls['ntpServer']; }

    nameserverValidation = [Validators.required, Validators.pattern(SystemGlobalSettingsComponent.REGEX)];

    constructor(private systemGlobalService: SystemGlobalService, fb: FormBuilder)
    {
      this.settingsGroup = fb.group({
        hostname: fb.control('', [Validators.required, Validators.minLength(1)]),
        gateway: fb.control('',
          [Validators.required, Validators.pattern(SystemGlobalSettingsComponent.REGEX)]),
        nameServer: fb.control('',
          [Validators.required, Validators.pattern(SystemGlobalSettingsComponent.REGEX)]),
        ntpServer: fb.control('', [Validators.required, Validators.minLength(1)])
      });

      this.systemGlobalService.globalSettings$.subscribe((settings => {
        this.settingsGroup.setValue(settings);
      }));

      this.settingsGroup.valueChanges.subscribe(settings => this.changedSettings = settings);
    }


    applyClicked(event): void
    {
      this.updatedSettings = this.changedSettings;
    }

    otherServerChanged(data: string) {
      this.otherServerIP = data;
    }
}
