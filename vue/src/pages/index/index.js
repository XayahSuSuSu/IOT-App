import {getLatestData} from '@/api/api'
import {mdiAirHumidifier, mdiAlarmLight, mdiResistorNodes, mdiServer, mdiTemperatureCelsius, mdiUpdate} from '@mdi/js'


import VeLine from 'v-charts/lib/line.common'

export default {
    name: 'Index',
    components: {VeLine},
    data: () => ({
        chartData: {
            columns: ['id', 'temp', 'humi', 'lum'],
            rows: []
        },
        stateSwitcher: false,
        refreshTime: 1000,
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
        getLatestData() {
            if (this.stateSwitcher) {
                getLatestData().then(res => {
                    const dataRes = JSON.parse(JSON.stringify(res.data.data))
                    this.stateData[0].total = dataRes.temp
                    this.stateData[1].total = dataRes.humi
                    this.stateData[2].total = dataRes.lum
                    this.stateData[3].total = new Date().toLocaleTimeString()
                    console.log(dataRes)
                    const mLength = this.chartData.rows.length
                    if (mLength === 0) {
                        this.chartData.rows.push({
                            'id': dataRes.id,
                            'temp': dataRes.temp,
                            'humi': dataRes.humi,
                            'lum': dataRes.lum
                        })
                    } else {
                        if (this.chartData.rows[mLength - 1]['id'] !== dataRes.id) {
                            if (mLength === 10) {
                                this.chartData.rows.splice(0, 1)
                            }
                            this.chartData.rows.push({
                                'id': dataRes.id,
                                'temp': dataRes.temp,
                                'humi': dataRes.humi,
                                'lum': dataRes.lum
                            })
                        }
                    }
                })
            } else {
                // this.stateData[3].total = '已停止更新'
            }
        },
        goToHistoryData() {
            this.$router.push({
                name: 'HistoryData'
            })
        },
        goToControlCenter() {
            this.$router.push({
                name: 'ControlCenter'
            })
        }
    },
    created() {
        setInterval(() => {
            setTimeout(() => {
                this.getLatestData()
            }, 0)
        }, this.refreshTime)
    }
}
