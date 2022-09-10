import { Component, OnInit } from '@angular/core'
import { LayoutService } from '../layout/services/layout.service'
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { environment } from '../../../environments/environment'

import * as echarts from 'echarts'

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

  isShowVector: boolean = true
  isShowUserVector: boolean = true

  listSelected: string = 'My List'

  navBtn: navBtnItem[] = [
    {
      Code_id: '',
      Code_Name: 'All',
    },
  ]
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
      let len = 20
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
        now = new Date(+now - 2000)
      }
      return res
    })()
    const categories2 = (function () {
      let res = []
      let len = 20
      while (len--) {
        res.push(20 - len - 1)
      }
      return res
    })()
    const data: number[] = (function () {
      let res = []
      let len = 20
      while (len--) {
        res.push(Math.round(Math.random() * 1000))
      }
      return res
    })()
    const data2: number[] = (function () {
      let res = []
      let len = 0
      while (len < 20) {
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
    app.count = 20
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

    option && myChart.setOption(option)
    option2 && myChart2.setOption(option2)
    option3 && myChart3.setOption(option3)
    option4 && myChart4.setOption(option4)
    //#endregion
  }

  ngAfterViewInit() {}

  // InProfessCount(data: emitObj) {
  //   if (data.type == 'All') {
  //     this.InProfressCountAll = data.Notfrozen;
  //   } else {
  //     if (this.layoutService.getInProfressCount('InProfressCount') != null) this.layoutService.removeInProfressCount('InProfressCount');
  //     this.layoutService.setInProfressCount('InProfressCount', data.Notfrozen);
  //     this.InProfressCount = data.Notfrozen;
  //   }
  // }

  Visible(data: any, Type: string) {
    console.log(data)

    if (Type == 'List') this.isShowVector = !data
    else this.isShowUserVector = !data
  }
}
