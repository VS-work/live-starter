import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  public localStorage: Storage = localStorage;
  public itemEvents: Subject<any> = new Subject<any>();

  public setItem(key: string, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
    this.itemEvents.next({key, value: JSON.stringify(value)});
  }

  public removeItem(key: string): void {
    this.localStorage.removeItem(key);
    this.itemEvents.next({key: key});
  }

  public getItem(key: string): any {
    return this.localStorage.getItem(key);
  }

  public getItemEvent(): Observable<{key: string, value: string}> {
    return this.itemEvents;
  }
}
