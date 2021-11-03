import {addBooks, getBooks, getData} from '@/api/api'
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
        ifAdding: false,
        valid: false,
        dialogs: {
            add_books: {
                show: false,
                rules: {
                    rfid: [
                        v => !!v || '请输入图书编号',
                    ],
                    name: [
                        v => !!v || '请输入图书名称',
                    ],
                    place: [
                        v => !!v || '请输入存放位置',
                    ]
                },
                codes: {
                    rfid: '',
                    name: '',
                    place: '',
                }
            },
        },
    }),
    methods: {
        getTenData() {
            if (this.stateSwitcher) {
                getData().then(res => {
                    const dataRes = JSON.parse(JSON.stringify(res.data.data))
                    const mLength = dataRes.length
                    this.stateData[0].total = dataRes[mLength - 1].smoke1
                    this.stateData[1].total = dataRes[mLength - 1].smoke2
                    this.stateData[2].total = 0
                    this.stateData[3].total = new Date().toLocaleTimeString()
                    this.chartData.rows = []
                    if (mLength < 10) {
                        for (let i = 0; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                '烟雾传感器1': dataRes[i].smoke1,
                                '烟雾传感器2': dataRes[i].smoke2,
                                '非法闯入': 0
                            })
                        }
                    } else {
                        for (let i = mLength - 10; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                '烟雾传感器1': dataRes[i].smoke1,
                                '烟雾传感器2': dataRes[i].smoke2,
                                '非法闯入': 0
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
        getBooks() {
            getBooks().then(res => {
                const books_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(books_res)
                const books_res_length = books_res.length
                if (books_res[books_res_length - 1]['name'] === '') {
                    this.dialogs.add_books.codes.head = books_res[books_res_length - 1]['rfid']
                    this.ifAdding = true
                } else {
                    this.ifAdding = false
                }
            })
        },
        addBooks() {
            this.dialogs.add_books.show = false
            const data = {
                rfid: this.dialogs.add_books.codes.head,
                name: this.dialogs.add_books.codes.tail,
                place: this.dialogs.add_books.codes.obj
            }
            addBooks(data).then(res => {
                const books_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(books_res)
            })
        },
    },
    created() {
        this.getBooks()
        setInterval(() => {
            setTimeout(() => {
                this.getTenData()
                if (this.dialogs.add_books.show === true) {
                    this.getBooks()
                }
            }, 0)
        }, this.refreshTime)
    }
}
