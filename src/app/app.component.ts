import { Component } from '@angular/core';
import { CheckForUpdateService } from 'src/shared/services/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'poc-service-worker';
  constructor(private checkForUpdateService: CheckForUpdateService) {
    this.checkForUpdateService.checkUpdate();
  }
}
