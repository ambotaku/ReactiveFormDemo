import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

export interface GlobalSettings {
  hostname: string;
  gateway: string;
  netmask: string;
  nameServer: string;
  ntpServer: string;
}

@Injectable()
export class SystemGlobalService {
  globalSettings$ = Observable.of({
    hostname: '192.168.11.10',
    gateway: '192.168.11.12',
    netmask: '255.255.255.0',
    nameServer: '192.168.11.14',
    ntpServer: '192.168.11.16' });
}