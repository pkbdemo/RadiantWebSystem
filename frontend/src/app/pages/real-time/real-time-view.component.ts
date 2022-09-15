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
  selector: 'app-real-time-view',
  templateUrl: './real-time-view.component.html',
  styleUrls: ['./real-time-view.component.css'],
})
export class RealTimeViewComponent implements OnInit {
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

  async ngOnInit() {
    //#region
    var app: any = {}
    type EChartsOption = echarts.EChartsOption

    var chartDom = document.getElementById('main')!
    var chartDom2 = document.getElementById('main2')!
    var chartDom3 = document.getElementById('main3')!
    var chartDom4 = document.getElementById('main4')!

    var myChart = echarts.init(chartDom)
    var myChart2 = echarts.init(chartDom2)
    var myChart3 = echarts.init(chartDom3)
    var myChart4 = echarts.init(chartDom4)

    var option: EChartsOption
    var option2: EChartsOption
    var option3: EChartsOption
    var option4: EChartsOption
    const categories = (function () {
      let now = new Date()
      let res = []
      let len = 30
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
        now = new Date(+now - 2000)
      }
      return res
    })()
    const categories2 = (function () {
      let res = []
      let len = 30
      while (len--) {
        res.push(30 - len - 1)
      }
      return res
    })()
    const data: number[] = (function () {
      let res = []
      let len = 30
      while (len--) {
        res.push(Math.round(Math.random() * 1000))
      }
      return res
    })()
    const data2: number[] = (function () {
      let res = []
      let len = 0
      while (len < 30) {
        res.push(+(Math.random() * 10 + 5).toFixed(1))
        len++
      }
      return res
    })()

    option = {
      title: {
        text: '冰水出水',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories,
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Price',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: 'Dynamic Bar',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data,
        },
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2,
        },
      ],
    }

    option2 = {
      title: {
        text: '冰水入水',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories,
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Price',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: 'Dynamic Bar',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data,
        },
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2,
        },
      ],
    }

    option3 = {
      title: {
        text: '冷卻水出水',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories,
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Price',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: 'Dynamic Bar',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data,
        },
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2,
        },
      ],
    }

    option4 = {
      title: {
        text: '冷卻水入水',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories,
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Price',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: 'Dynamic Bar',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data,
        },
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2,
        },
      ],
    }
    app.count = 30
    setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')

      data.shift()
      data.push(Math.round(Math.random() * 1000))
      data2.shift()
      data2.push(+(Math.random() * 10 + 5).toFixed(1))

      categories.shift()
      categories.push(axisData)
      categories2.shift()
      categories2.push(app.count++)

      myChart.setOption<echarts.EChartsOption>({
        xAxis: [
          {
            data: categories,
          },
          {
            data: categories2,
          },
        ],
        series: [
          {
            data: data,
          },
          {
            data: data2,
          },
        ],
      })
      myChart2.setOption<echarts.EChartsOption>({
        xAxis: [
          {
            data: categories,
          },
          {
            data: categories2,
          },
        ],
        series: [
          {
            data: data,
          },
          {
            data: data2,
          },
        ],
      })
      myChart3.setOption<echarts.EChartsOption>({
        xAxis: [
          {
            data: categories,
          },
          {
            data: categories2,
          },
        ],
        series: [
          {
            data: data,
          },
          {
            data: data2,
          },
        ],
      })
      myChart4.setOption<echarts.EChartsOption>({
        xAxis: [
          {
            data: categories,
          },
          {
            data: categories2,
          },
        ],
        series: [
          {
            data: data,
          },
          {
            data: data2,
          },
        ],
      })
    }, 2100)

    this.chart1 = chartDom
    this.chart2 = chartDom2
    this.chart3 = chartDom3
    this.chart4 = chartDom4
    option && myChart.setOption(option)
    option2 && myChart2.setOption(option2)
    option3 && myChart3.setOption(option3)
    option4 && myChart4.setOption(option4)
    //#endregion

    this.myChartGlobal1 = myChart
    this.myChartGlobal2 = myChart2
    this.myChartGlobal3 = myChart3
    this.myChartGlobal4 = myChart4

    this.optionGlobal1 = option
    this.optionGlobal2 = option2
    this.optionGlobal3 = option3
    this.optionGlobal4 = option4
  }

  Visible(data: any, Type: string) {
    console.log(data)

    if (Type == 'List') this.isShowVector = !data
    else this.isShowUserVector = !data
  }

  selectDiv(item: number): void {
    switch (item) {
      case 1:
        this.selectedDiv = '冰水出水'
        this.chart1.style.width = '100' + '%'
        this.chart1.style.height = '800' + '%'
        this.myChartGlobal1.resize()
        // this.myChartGlobal1.clear()
        // this.myChartGlobal1.resize({
        //   width: '1200%',
        //   height: '600%',
        // })

        // this.myChartGlobal1.setOption(this.optionGlobal1)
        // this.myChartGlobal1.resize()
        break
      case 2:
        this.selectedDiv = '冰水入水'
        this.chart2.style.width = '100' + '%'
        this.chart2.style.height = '800' + '%'
        this.myChartGlobal2.resize()
        break
      case 3:
        this.selectedDiv = '冷卻水出水'
        this.chart3.style.width = '100' + '%'
        this.chart3.style.height = '800' + '%'
        this.myChartGlobal3.resize()
        break
      case 4:
        this.selectedDiv = '冷卻水入水'
        this.chart4.style.width = '100' + '%'
        this.chart4.style.height = '800' + '%'
        this.myChartGlobal4.resize()
        break
    }
  }

  clearSelected(): void {
    if (this.selectedDiv == '冰水出水') {
      this.chart1.style.width = '50' + '%'
      this.chart1.style.height = '400' + '%'
      this.myChartGlobal1.resize()
    } else if (this.selectedDiv == '冰水入水') {
      this.chart2.style.width = '50' + '%'
      this.chart2.style.height = '400' + '%'
      this.myChartGlobal2.resize()
    } else if (this.selectedDiv == '冷卻水出水') {
      this.chart3.style.width = '50' + '%'
      this.chart3.style.height = '400' + '%'
      this.myChartGlobal3.resize()
    } else if (this.selectedDiv == '冷卻水入水') {
      this.chart4.style.width = '50' + '%'
      this.chart4.style.height = '400' + '%'
      this.myChartGlobal4.resize()
    }

    // this.chart2.style.width = '50' + '%'
    // this.chart2.style.height = '400' + '%'
    // this.myChartGlobal2.resize()
    // this.chart3.style.width = '50' + '%'
    // this.chart3.style.height = '400' + '%'
    // this.myChartGlobal3.resize()
    // this.chart4.style.width = '50' + '%'
    // this.chart4.style.height = '400' + '%'
    // this.myChartGlobal4.resize()
    this.selectedDiv = 'initial'
  }
}
