import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { KeycloakService } from 'keycloak-angular'
// import { MatomoInjector, MatomoTracker } from 'ngx-matomo';
import { filter } from 'rxjs'

import { IMSConstants } from 'src/app/utils/IMSConstants'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'IMS'

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(async (event: NavigationEnd) => {
    //   if (environment.matomoSiteId > 0) { //Only track DEV, QAS and PRD. Set its value to -1 in localhost to ignore tracking.
    //     //Tracking user behavior
    //     this.matomoTracker.setCustomUrl(location.href);
    //     this.matomoTracker.setDocumentTitle(document.title);
    //     this.matomoInjector.init(IMSConstants.matomoURL, environment.matomoSiteId);
    //   }
    // });
  }
}
