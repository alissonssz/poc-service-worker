import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * based on https://github.com/funOfheuristic/angular-pwa/blob/master/src/app/app.component.ts
 */
export class CheckForUpdateService {
  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {
    this.clientUpdate();
  }

  /**
   * pops up a confirm modal everytime that there is change on the files
   */
  clientUpdate() {
    if (!this.swUpdate.isEnabled) {
      console.log('Not Enabled');
      return;
    }
    this.swUpdate.available.subscribe((event) => {
      console.log(`current`, event.current, `available `, event.available);
      if (confirm('update available for the app please conform')) {
        this.swUpdate.activateUpdate().then(() => location.reload());
      }
    });
  }

  /**
   * @description Update the client each 8 hours
   * */
  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);
        timeInterval.subscribe(() => {
          this.swUpdate.checkForUpdate().then(() => console.log('checked'));
          console.log('update checked');
        });
      }
    });
  }
}
