import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../../environments/environment';
import { IMSConstants } from '../../../utils/IMSConstants';
import { LayoutService } from '../../layout/services/layout.service';

@Component({
  selector: 'app-callapi',
  templateUrl: './callapi.component.html',
  styleUrls: ['./callapi.component.css']
})
export class CallapiComponent implements OnInit {

  accessToken: string;
  responseResult: string;

  constructor(private httpClient: HttpClient,
    private keycloakService: KeycloakService,
    private layoutService: LayoutService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.keycloakService.getToken().then(
      data => {
        this.accessToken = data;
      }
    );
  }

  toggleRightBar() {
    this.layoutService.toggleRightBar();
  }

  findAll(): void {
    this.httpClient.post<any>(environment.apiServerURL + "Example/QueryAll", null).subscribe({
      next: (res) => {
        this.responseResult = res[0].user_ID + ", " + res[0].name + ", " + res[0].age + ", " + res[0].createby + ", " + res[0].create_Date;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(IMSConstants.serverErrorMsg);
      }
    });
  }

  createOne(): void {
    let formData = new FormData();
    formData.set("name", "小刚");
    formData.set("age", "45");

    this.httpClient.post<any>(environment.apiServerURL + "Example/AddExample", formData).subscribe({
      next: (res) => {
        this.responseResult = IMSConstants.createSuccess;
        this.toastr.success(IMSConstants.createSuccess);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(IMSConstants.serverErrorMsg);
      }
    });
  }

  updateOne(): void {
    let formData = new FormData();
    formData.set("userID", "4");
    formData.set("name", "小刚2");
    formData.set("age", "55");

    this.httpClient.put<any>(environment.apiServerURL + "Example/UpdateExample", formData).subscribe({
      next: (res) => {
        this.responseResult = IMSConstants.updateSuccess;
        this.toastr.success(IMSConstants.updateSuccess);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(IMSConstants.serverErrorMsg);
      }
    });
  }

  deleteOne(): void {
    let httpParams = new HttpParams().set("userId", "5");
    //Attention!!! If have multi parameters, it should be
    //let httpParams = new HttpParams().set("param1", "value1").set("param2", "value2").set("param3", "value3");

    let options = { params: httpParams };
    
    this.httpClient.delete<any>(environment.apiServerURL + "Example/DeleteExample", options).subscribe({
      next: (res) => {
        this.responseResult = IMSConstants.deleteSuccess;
        this.toastr.success(IMSConstants.deleteSuccess);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(IMSConstants.serverErrorMsg);
      }
    });
  }

  findByID(): void {
    this.httpClient.get<any>(environment.apiServerURL + "Example/QueryExampleById/1").subscribe({
      next: (res) => {
        this.responseResult = res.user_ID + ", " + res.name + ", " + res.age + ", " + res.createby + ", " + res.create_Date;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(IMSConstants.serverErrorMsg);
      }
    });
  }
}