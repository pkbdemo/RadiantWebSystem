import { Component, OnInit } from '@angular/core'
import { KeycloakService } from 'keycloak-angular'
import { KeycloakProfile } from 'keycloak-js'

import { LayoutService } from '../../services/layout.service'

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {
  public activeMenu: string = ''

  userDetails: KeycloakProfile
  accessToken: string
  responseResult: string
  userName: string

  InProfressCount: number = this.layoutService.getInProfressCount(
    'InProfressCount',
  )

  public MyFavorite: any

  constructor(
    private layoutService: LayoutService,
    private keycloakService: KeycloakService,
  ) {}

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile()
    }
    let userID = sessionStorage.getItem('userID')

    // if (userID == null) {
    //   sessionStorage.setItem("userID", this.userDetails.username);
    //   sessionStorage.setItem("userName", this.userDetails.firstName);
    // } else {
    //   if (userID != this.userDetails.username) {
    //     sessionStorage.setItem("userID", this.userDetails.username);
    //     sessionStorage.setItem("userName", this.userDetails.firstName);
    //   }
    // }
  }

  openItem(item: string) {
    if (this.activeMenu == item) {
      this.activeMenu = ''
    } else {
      this.activeMenu = item
    }
  }

  toggleSmallMenu() {
    this.layoutService.toggleLeftBar()
  }
}
