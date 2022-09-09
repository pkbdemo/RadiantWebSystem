import { Component, OnInit } from '@angular/core'
import { KeycloakService } from 'keycloak-angular'
import { KeycloakProfile } from 'keycloak-js'
import Swal from 'sweetalert2'

import { LayoutService } from '../../services/layout.service'
import { IMSConstants } from 'src/app/utils/IMSConstants'

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent implements OnInit {
  userDetails: KeycloakProfile

  constructor(
    private layoutService: LayoutService,
    private keycloakService: KeycloakService,
  ) {}

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile()
    }
  }

  toggleSetting() {
    this.layoutService.toggleSettings()
  }

  showSearch() {
    this.layoutService.showSearch()
  }

  showEmail() {
    Swal.fire('若有疑問請聯絡：', IMSConstants.contactEmail)
  }

  async doLogout() {
    let signOutWarning = 'Are you sure to logout?'

    if (confirm(signOutWarning)) {
      sessionStorage.clear()
      await this.keycloakService.logout(
        window.location.protocol + '//' + window.location.host,
      )
    }
  }
}
