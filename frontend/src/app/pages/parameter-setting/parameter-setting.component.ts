import { Component, OnInit } from '@angular/core'
import { LayoutService } from '../layout/services/layout.service'
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { environment } from '../../../environments/environment'
import * as echarts from 'echarts'
import { NzButtonSize } from 'ng-zorro-antd/button'
import Keyboard from 'simple-keyboard'
interface navBtnItem {
  Code_id: string
  Code_Name: string
}
@Component({
  selector: 'app-parameter-setting',
  templateUrl: './parameter-setting.component.html',
  styleUrls: ['./parameter-setting.component.css'],
})
export class ParameterSettingViewComponent implements OnInit {
  type: string = ''
  userName: string
  userId: string
  navCheckBtn: number = 0
  InProfressCount: number = 0
  InProfressCountAll: number = 0
  size: NzButtonSize = 'large'
  isShowVector: boolean = true
  isShowUserVector: boolean = true
  selectedDiv: string = 'initial'
  listSelected: string = 'My List'
  chart1: any
  chart2: any
  chart3: any
  chart4: any
  myChartGlobal1: any
  myChartGlobal2: any
  myChartGlobal3: any
  myChartGlobal4: any
  optionGlobal1: any
  optionGlobal2: any
  optionGlobal3: any
  optionGlobal4: any
  navBtn: navBtnItem[] = [
    {
      Code_id: '',
      Code_Name: 'All',
    },
  ]
  //鍵盤相關
  value = ''
  value2 = ''
  keyboard: Keyboard
  keyboard_hidden: boolean = true

  asdf() {
    debugger
    // this.keyboard.clearInput()
    var tt = this.keyboard.getInput('deult')
    var tt = this.keyboard.getInput('dlt')
    var tt = this.value
    var tt = this.value2
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: (input) => this.onChange(input, 1),
      onKeyPress: (button) => this.onKeyPress(button),
    })
  }

  clickNum1() {
    this.keyboard.destroy()
    this.keyboard = new Keyboard({
      onChange: (input) => this.onChange(input, 1),
      onKeyPress: (button) => this.onKeyPress(button),
      inputName: 'deult',
    })
    // this.keyboard.destroy()
    this.keyboard_hidden = false
  }
  clickNum2() {
    this.keyboard.destroy()
    this.keyboard = new Keyboard({
      onChange: (input) => this.onChange(input, 2),
      onKeyPress: (button) => this.onKeyPress(button),
      inputName: 'dlt',
    })
    // this.keyboard.destroy()
    this.keyboard_hidden = false
  }

  onChange = (input: string, num: number) => {
    if (num == 1) this.value = input
    if (num == 2) this.value2 = input
    console.log('Input changed', input)
  }

  onKeyPress = (button: string) => {
    console.log('Button pressed', button)

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') this.handleShift()
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value)
  }

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName
    let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'

    this.keyboard.setOptions({
      layoutName: shiftToggle,
    })
  }

  constructor(
    private layoutService: LayoutService,
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) {}

  async ngOnInit() {}
}
