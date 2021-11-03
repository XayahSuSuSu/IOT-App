import {getAllData, getLatestData} from '@/api/api'
import {
    mdiCactus,
    mdiResistorNodes,
    mdiServer,
    mdiSmoke,
    mdiUpdate
} from '@mdi/js'


import VeLine from 'v-charts/lib/line.common'

export default {
    name: 'Index',
    components: {VeLine},
    data: () => ({
        chartData: {
            columns: ['id', '烟雾传感器1', '烟雾传感器2', '非法闯入'],
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
                title: '烟雾传感器1',
                total: 0,
                icon: mdiSmoke,
                color: 'success'
            },
            {
                title: '烟雾传感器2',
                total: 0,
                icon: mdiSmoke,
                color: 'primary'
            },
            {
                title: '非法闯入',
                total: 0,
                icon: mdiCactus,
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
                            'id': dataRes.id.toString(),
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
                                'id': dataRes.id.toString(),
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
        getTenData() {
            if (this.stateSwitcher) {
                getAllData().then(res => {
                    const dataRes = JSON.parse(JSON.stringify(res.data.data))
                    const mLength = dataRes.length
                    this.stateData[0].total = dataRes[mLength - 1].temp
                    this.stateData[1].total = dataRes[mLength - 1].humi
                    this.stateData[2].total = dataRes[mLength - 1].lum
                    this.stateData[3].total = new Date().toLocaleTimeString()
                    this.chartData.rows = []
                    if (mLength < 10) {
                        for (let i = 0; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                'temp': dataRes[i].temp,
                                'humi': dataRes[i].humi,
                                'lum': dataRes[i].lum
                            })
                        }
                    } else {
                        for (let i = mLength - 10; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                'temp': dataRes[i].temp,
                                'humi': dataRes[i].humi,
                                'lum': dataRes[i].lum
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
                // this.getLatestData()
                this.getTenData()
            }, 0)
        }, this.refreshTime)
    }
}
