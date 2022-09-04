import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../layout/services/layout.service';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';

import { emitObj } from '../duediligenceModel';

interface navBtnItem {
  Code_id: string;
  Code_Name: string;
}
@Component({
  selector: 'app-due-diligence',
  templateUrl: './due-diligence.component.html',
  styleUrls: ['./due-diligence.component.css']
})
export class DueDiligenceComponent implements OnInit {

  type: string = '';
  userName: string;
  userId: string;
  navCheckBtn: number = 0;
  InProfressCount: number = 0;
  InProfressCountAll: number = 0;

  isShowVector: boolean = true;
  isShowUserVector: boolean = true;

  listSelected: string = 'My List';

  navBtn: navBtnItem[] = [
    {
      Code_id: '',
      Code_Name: 'All'
    }];
  constructor(private layoutService: LayoutService,
    private httpClient: HttpClient,
    private toastr: ToastrService) { }

  async ngOnInit() {
    this.userName = await sessionStorage.getItem("userName");

    let formData2 = new FormData();
    formData2.set("Kind_id", "015");
    this.httpClient.post<any>(environment.apiServerURL + "Utilities/SearchCodeList", formData2).subscribe({
      next: (res) => {
        for (let item of res) {
          let navBtnItem: navBtnItem = {
            Code_id: '',
            Code_Name: ''
          };
          navBtnItem.Code_id = item.code_id;
          navBtnItem.Code_Name = item.code_Name;
          this.navBtn = [...this.navBtn, navBtnItem];
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("request failed");
      }
    });
  }

  ngAfterViewInit() {
  }

  InProfessCount(data: emitObj) {
    if (data.type == 'All') {
      this.InProfressCountAll = data.Notfrozen;
    } else {
      if (this.layoutService.getInProfressCount('InProfressCount') != null) this.layoutService.removeInProfressCount('InProfressCount');
      this.layoutService.setInProfressCount('InProfressCount', data.Notfrozen);
      this.InProfressCount = data.Notfrozen;
    }
  }

  Visible(data: any, Type: string) {
    console.log(data);

    if (Type == 'List') this.isShowVector = !data;
    else this.isShowUserVector = !data;
  }
}
