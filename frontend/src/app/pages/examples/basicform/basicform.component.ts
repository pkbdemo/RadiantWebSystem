import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-basicform',
  templateUrl: './basicform.component.html',
  styleUrls: ['./basicform.component.css']
})
export class BasicformComponent implements OnInit {

  param = {xxxValue1: 'HuaWei', xxxValue2: '1987'};

  uploadFile: File;
  isChooseFile: boolean = false;
  fileName: string;
  uploadFileName: string;
  objectName: string;

  constructor() { }

  ngOnInit() {
    $('input[id="birthday"]').daterangepicker({
      timePicker: true,
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1990,
      maxYear: 2050,
      locale: {
        format: 'YYYY-MM-DD HH:mm:ss'
      }
    });
  }
}
