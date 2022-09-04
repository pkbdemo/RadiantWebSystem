import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tableListItem } from '../duediligenceModel';

import { HttpClient } from "@angular/common/http";
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';

import { LayoutService } from '../../../layout/services/layout.service';
import { environment } from '../../../../../environments/environment';

import { SearchCodeList, SelectValue, emitObj } from '../duediligenceModel';

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  @Input() type: string;

  @Output() InProfessCount = new EventEmitter<emitObj>();

  listOfColumn = [
    {
      title: '公司全稱',
      compare: (a: tableListItem, b: tableListItem) => a.name > b.name,
      priority: 1
    },
    {
      title: '證券種類',
      compare: null,
      priority: false
    },
    {
      title: '進度',
      compare: (a: tableListItem, b: tableListItem) => a.status > b.status,
      priority: 2
    },
    {
      title: 'Decision',
      compare: null,
      priority: false
    },
    {
      title: '負責人',
      compare: null,
      priority: false
    },
    {
      title: '建立日期',
      compare: null,
      priority: false
    }
  ];

  userId: string;
  //上下箭頭展示控制
  Notfrozen: number = 0;
  AllNotfrozen: number = 0;
  //下拉菜单數據源資料
  selectCompanyValud: SelectValue[] = [];
  selectStatusValud: SelectValue[] = [];

  //搜索资料
  listOfSecurityValue: string[] = [];
  searchValue: string;
  listOfStatusData: string = '';

  //TableList数据源資料
  listOfData: tableListItem[] = [];

  //组件外Nav条件限制，更改的数据源资料
  listOfExternalData: tableListItem[] = [];

  //组件外Header条件限制,更改的数据源资料
  listOfHeaderData: tableListItem[] = [];

  //TableList 过滤后展示资料
  listOfDisplayData: tableListItem[] = [];
  constructor(private httpClient: HttpClient,
    private keycloakService: KeycloakService,
    private layoutService: LayoutService,
    private toastr: ToastrService) { }

  async ngOnInit() {
    if (this.type == '') {
      this.httpClient.get<any>(environment.apiServerURL + "DDiligence/QueryAll").subscribe({
        next: (res) => {
          console.log(res);
          this.listOfData = [...this.listOfData, ...res];
          this.listOfHeaderData = [...this.listOfData]
          this.listOfExternalData = [...this.listOfHeaderData];
          this.listOfDisplayData = [...this.listOfExternalData];
          this.userId = sessionStorage.getItem("userID");
          if (this.userId != null) this.UpdateHeaderDate(this.userId);
          this.AllNotfrozen = this.listOfData.length;
          this.InProfessCount.emit({
            type: 'All',
            Notfrozen: this.AllNotfrozen
          });
          this.Notfrozen = 0;
          for (let item of this.listOfDisplayData) {
            if (item.frozen_Type == '001') this.Notfrozen++;
          }
          this.layoutService.setInProfressCount('InProfressCount', this.Notfrozen);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("request failed");
        }
      });
    }
    this.getCompany();
    this.getStatusData();

  }

  getCompany() {
    let formData = new FormData();
    formData.set("Kind_id", "001");
    this.httpClient.post<any>(environment.apiServerURL + "Utilities/SearchCodeList", formData).subscribe({
      next: (res) => {
        for (let item of res) {
          let data: SelectValue = {
            label: '',
            value: ''
          };
          data.label = item.code_Name;
          data.value = item.code_id;
          data.checked = false;
          data.disabled = false;
          this.selectCompanyValud = [...this.selectCompanyValud, data];
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("request failed");
      }
    });
  }

  getStatusData() {
    let formData1 = new FormData();
    formData1.set("Kind_id", "014");
    this.httpClient.post<any>(environment.apiServerURL + "Utilities/SearchCodeList", formData1).subscribe({
      next: (res) => {
        for (let item of res) {
          let data: SelectValue = {
            label: '',
            value: ''
          };
          data.label = item.code_Name;
          data.value = item.code_id;
          this.selectStatusValud = [...this.selectStatusValud, data].sort((a, b) => a['value'] > b['value'] ? 1 : -1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("request failed");
      }
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchValue = this.searchValue == null ? '' : this.searchValue;
    this.listOfDisplayData = this.listOfExternalData.filter((item: tableListItem) => {
      return (item.name.indexOf(this.searchValue) !== -1 || item.user_Name.indexOf(this.searchValue) !== -1)
    });
    let i = this.listOfSecurityValue.length > 0 ? (this.listOfStatusData !== '' ? 2 : 1) : (this.listOfStatusData !== '' ? 1 : 0);
    switch (i) {
      case 0:
        break;
      case 1:
        {
          if (this.listOfSecurityValue.length > 0) {
            this.listOfDisplayData = this.listOfExternalData.filter((item: tableListItem) => {
              return this.listOfSecurityValue.every((x) => {
                return item.string_Agg.split(',').includes(x);
              }) && (item.name.indexOf(this.searchValue) !== -1 || item.user_Name.indexOf(this.searchValue) !== -1)
            });
          } else {
            if (this.listOfStatusData !== '') {
              this.listOfDisplayData = this.listOfExternalData.filter((item: tableListItem) => {
                return (this.listOfStatusData === item.status_Name) && (item.name.indexOf(this.searchValue) !== -1 || item.user_Name.indexOf(this.searchValue) !== -1)
              });
            }
          }
        }
        break;
      case 2:
        this.listOfDisplayData = this.listOfExternalData.filter((item: tableListItem) => {
          return this.listOfSecurityValue.every((x) => {
            return item.string_Agg.split(',').includes(x);
          }) && (item.name.indexOf(this.searchValue) !== -1 || item.user_Name.indexOf(this.searchValue) !== -1)
            && (this.listOfStatusData === item.status_Name)
        });
        break;
    }
  }

  CompanyTransaction(data: SelectValue): void {
    if (data.checked) {
      this.listOfSecurityValue = [...this.listOfSecurityValue, data.label];
      if (data.value <= '005') {
        for (let item of this.selectCompanyValud) {
          if (item.value > '005') item.disabled = true;
        }
      } else if (data.value == '006') {
        for (let item of this.selectCompanyValud) {
          if (item.value < '006' || item.value == '007') item.disabled = true;
        }
      } else {
        for (let item of this.selectCompanyValud) {
          if (item.value < '007') item.disabled = true;
        }
      }
    } else {
      this.listOfSecurityValue = this.listOfSecurityValue.filter(d => d !== data.label);
      if (data.value == '006') {
        for (let item of this.selectCompanyValud) {
          if (item.value != '006') item.disabled = false;
        }
      } else if (data.value == '007') {
        for (let item of this.selectCompanyValud) {
          if (item.value != '007') item.disabled = false;
        }
      } else {
        if (this.listOfSecurityValue.length == 0) {
          for (let item of this.selectCompanyValud) {
            if (item.value > '005') item.disabled = false;
          }
        }
      }
    }
  }
  closeSelectValue(type: string) {
    if (type == 'Security' && this.listOfSecurityValue.length > 0) {
      this.listOfSecurityValue = this.listOfSecurityValue.filter(d => d == '-1');
      for (let item of this.selectCompanyValud) {
        item.disabled = false;
        item.checked = false;
      }
    }
    if (type == 'Status' && this.listOfStatusData != '') {
      this.listOfStatusData = '';
    }
    if (type == 'All') {
      this.listOfSecurityValue = this.listOfSecurityValue.filter(d => d == '-1');
      for (let item of this.selectCompanyValud) {
        item.disabled = false;
        item.checked = false;
      }
      this.searchValue = '';
      this.listOfStatusData = '';
    }
    this.search();
  }

  //Nav 操作元数据 listOfExternalData  =>  操作 Decision
  //因为多层操作 所以每次操作完成需要多层赋值
  UpdataNavData(data: string) {
    this.listOfExternalData = this.listOfHeaderData.filter((item: tableListItem) => {
      console.log(item.frozen_Type.indexOf(data) !== -1);
      return item.frozen_Type.indexOf(data) !== -1
    });
    this.listOfDisplayData = [...this.listOfExternalData];
  }

  UpdateHeaderDate(data: string) {
    this.listOfHeaderData = this.listOfData.filter((item: tableListItem) => {
      return item.user_Id.indexOf(data) !== -1
    });
    this.listOfDisplayData = [...this.listOfHeaderData];
    this.Notfrozen = 0;
    for (let item of this.listOfDisplayData) {
      if (item.frozen_Type == '001') this.Notfrozen++;
    }
    this.InProfessCount.emit({
      type: '',
      Notfrozen: this.Notfrozen
    });
  }
}
