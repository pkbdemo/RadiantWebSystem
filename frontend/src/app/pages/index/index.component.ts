import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/services/layout.service';

import { IMSConstants } from 'src/app/utils/IMSConstants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  contactEmail = IMSConstants.contactEmail;

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {

  }

  toggleRightBar() {
    this.layoutService.toggleRightBar();
  }
}
