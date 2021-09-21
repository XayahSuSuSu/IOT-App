import { getAllData, getLatestData } from '@/api/api'
import { mdiAirHumidifier, mdiAlarmLight, mdiResistorNodes, mdiServer, mdiTemperatureCelsius, mdiUpdate } from '@mdi/js'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
  name: 'Index',
  data: () => ({
    stateSwitcher: false,
    sparklines: {
      type: ['temp', 'humi', 'lum'],
      typeCN: ['温度', '湿度', '光照'],
      typeIndex: 0,
      width: 2,
      radius: 10,
      gradient: gradients[5],
      value: {
        'temp': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'humi': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'lum': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      gradients,
    },
    serverData: [
      {
        title: '服务器',
        total: '正常',
        icon: mdiServer,
        color: 'grey'
      },
      {
        title: '终端',
        total: '正常',
        icon: mdiResistorNodes,
        color: 'red'
      },
    ],
    stateData: [
      {
        title: '温度',
        total: 0,
        icon: mdiTemperatureCelsius,
        color: 'success'
      },
      {
        title: '湿度',
        total: 0,
        icon: mdiAirHumidifier,
        color: 'primary'
      },
      {
        title: '光照',
        total: 0,
        icon: mdiAlarmLight,
        color: 'warning'
      },
      {
        title: '更新',
        total: 0,
        icon: mdiUpdate,
        color: 'info'
      },
    ],
  }),
  methods: {
    getLatestData () {
      if (this.stateSwitcher) {
        getLatestData().then(res => {
          const dataRes = JSON.parse(JSON.stringify(res.data.data))
          this.stateData[0].total = dataRes.temp
          this.stateData[1].total = dataRes.humi
          this.stateData[2].total = dataRes.lum
          this.stateData[3].total = new Date().toLocaleTimeString()
          console.log(dataRes)
          this.sparklines.value.temp.splice(1, 1)
          this.sparklines.value.temp.push(dataRes.temp)
          this.sparklines.value.humi.splice(1, 1)
          this.sparklines.value.humi.push(dataRes.humi)
          this.sparklines.value.lum.splice(1, 1)
          this.sparklines.value.lum.push(dataRes.lum)
        })
      } else {
        // this.stateData[3].total = '已停止更新'
      }
    },
    changeType () {
      this.sparklines.typeIndex = (this.sparklines.typeIndex + 1) % 3
    },
    getAllData () {
      getAllData().then(res => {
        const dataRes = JSON.parse(JSON.stringify(res.data.data))
        this.sparklines.value.temp = []
        this.sparklines.value.humi = []
        this.sparklines.value.lum = []
        if (dataRes.length > 10) {
          for (let i = dataRes.length - 1; i > dataRes.length - 11; i--) {
            this.sparklines.value.temp.push(dataRes[i]['temp'])
            this.sparklines.value.humi.push(dataRes[i]['humi'])
            this.sparklines.value.lum.push(dataRes[i]['lum'])
          }
        }
        console.log(dataRes)
      })
    }
  },
  created () {
    setInterval(() => {
      setTimeout(() => {
        this.getLatestData()
      }, 0)
    }, 2000)
    // this.getAllData()
  }
}
