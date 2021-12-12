import {
    mdiAlarmLight,
    mdiResistorNodes,
    mdiServer,
    mdiSmoke, mdiTemperatureCelsius,
    mdiUpdate
} from '@mdi/js'


import VeLine from 'v-charts/lib/line.common'
import {addBox, addControlData, addObj, getData, getObj} from "@/api/api";

export default {
    name: 'Index',
    components: {VeLine},
    data: () => ({
        chartData: {
            columns: ['id', '箱内温度', '箱外温度', '箱内光照'],
            rows: []
        },
        isAdding: false,
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
                title: '储运箱编号',
                total: 202101,
                icon: mdiSmoke,
                color: 'success'
            },
            {
                title: '储运物品数量',
                total: 0,
                icon: mdiSmoke,
                color: 'primary'
            },
            {
                title: '更新',
                total: 0,
                icon: mdiUpdate,
                color: 'info'
            },
            {
                title: '箱内温度',
                total: 0,
                icon: mdiTemperatureCelsius,
                color: 'success'
            },
            {
                title: '箱外温度',
                total: 0,
                icon: mdiTemperatureCelsius,
                color: 'success'
            },
            {
                title: '箱内光照',
                total: 0,
                icon: mdiAlarmLight,
                color: 'warning'
            },
        ],
        dialog_box: {
            show: false,
            data: {
                VID: "202101",
                TinDH: "",
                TinDL: "",
                TG: "",
                LXD: "",
                TBegin: "",
                TEnd: "",
                VStatus: "",
            }
        },
        dialog_obj: {
            show: false,
            data: {
                VID: "202101",
                PID: "",
            }
        },
        dialog_limit: {
            show: false,
            data: {
                TinDH: "",
                TinDL: "",
                TG: "",
                LXD: "",
                TBegin: "",
                TEnd: "",
            }
        },
        valid: false,
    }),
    methods: {
        addBox() {
            this.dialog_box.show = false
            const data = {
                VID: this.dialog_box.data.VID,
                TinDH: this.dialog_box.data.TinDH,
                TinDL: this.dialog_box.data.TinDL,
                TG: this.dialog_box.data.TG,
                LXD: this.dialog_box.data.LXD,
                TBegin: this.dialog_box.data.TBegin,
                TEnd: this.dialog_box.data.TEnd,
                VStatus: this.dialog_box.data.VStatus,
            }
            addBox(data).then(res => {
                console.log(data)
                console.log(res)
            })
        },
        getData() {
            if (this.stateSwitcher) {
                this.getObj()
                getData().then(res => {
                    const dataRes = JSON.parse(JSON.stringify(res.data.data))
                    const mLength = dataRes.length
                    this.stateData[3].total = dataRes[mLength - 1].Tin
                    this.stateData[4].total = dataRes[mLength - 1].Tout
                    this.stateData[5].total = dataRes[mLength - 1].LXin
                    this.stateData[2].total = new Date().toLocaleTimeString()
                    this.chartData.rows = []
                    if (mLength < 10) {
                        for (let i = 0; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                '箱内温度': dataRes[i].Tin,
                                '箱外温度': dataRes[i].Tout,
                                '箱内光照': dataRes[i].LXin
                            })
                        }
                    } else {
                        for (let i = mLength - 10; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                '箱内温度': dataRes[i].Tin,
                                '箱外温度': dataRes[i].Tout,
                                '箱内光照': dataRes[i].LXin
                            })
                        }
                    }
                })
            } else {
                // this.stateData[3].total = '已停止更新'
            }
        },
        addMyControlData() {
            // [11,6,0,0,6,21,19,2,200,9.0,19.0,204]
            this.dialog_limit.show = false
            const code = "[11,6,0,0,6," + this.dialog_limit.data.TinDH + "," + this.dialog_limit.data.TinDL + "," + this.dialog_limit.data.TG + "," + this.dialog_limit.data.LXD + "," + this.dialog_limit.data.TBegin + "," + this.dialog_limit.data.TEnd + ",204]"
            addControlData(code).then(() => {
                this.getAllControlData()
            })
        },
        getObj() {
            getObj().then(res => {
                const obj_res = JSON.parse(JSON.stringify(res.data.data))
                const mLength = obj_res.length
                this.stateData[1].total = mLength
                this.dialog_obj.data.PID = obj_res[mLength - 1].PID
                this.stateData[2].total = new Date().toLocaleTimeString()
                console.log(obj_res)
            })
        },
        addObj() {
            this.dialog_obj.show = false
            const data = {
                VID: this.dialog_obj.data.VID,
                PID: this.dialog_obj.data.PID,
            }
            addObj(data).then(() => {
                this.dialog_obj.data.VID = ''
                this.dialog_obj.data.PID = ''
            })
        },
    },
    created() {
        setInterval(() => {
            setTimeout(() => {
                this.getData()
                if (this.dialog_obj.show) {
                    this.getObj()
                }
            }, 0)
        }, this.refreshTime)
    }
}
