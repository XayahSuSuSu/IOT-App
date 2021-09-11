import { getLatestData } from '@/api/api'
import { mdiAirHumidifier, mdiAlarmLight, mdiTemperatureCelsius, mdiUpdate } from '@mdi/js'

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
    stateSwitcher: true,
    sparklines: {
      width: 2,
      radius: 10,
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradients,
    },
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
          this.stateData[3].total = new Date().toLocaleString()
          console.log(dataRes)
        })
      } else {
        this.stateData[3].total = '已停止更新'
      }
    }
  },
  created () {
    setInterval(() => {
      setTimeout(() => {
        this.getLatestData()
      }, 0)
    }, 2000)
  }
}
