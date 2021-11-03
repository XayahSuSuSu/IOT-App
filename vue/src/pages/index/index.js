import {addBooks, addUsers, getBooks, getData, getUsers} from '@/api/api'
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
            add_users: {
                show: false,
                rules: {
                    rfid: [
                        v => !!v || '请输入用户编号',
                    ],
                    name: [
                        v => !!v || '请输入用户名称',
                    ]
                },
                codes: {
                    rfid: '',
                    name: '',
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
                    this.dialogs.add_books.codes.rfid = books_res[books_res_length - 1]['rfid']
                    this.ifAdding = true
                } else {
                    this.ifAdding = false
                }
            })
        },
        addBooks() {
            this.dialogs.add_books.show = false
            const data = {
                rfid: this.dialogs.add_books.codes.rfid,
                name: this.dialogs.add_books.codes.name,
                place: this.dialogs.add_books.codes.place
            }
            addBooks(data).then(res => {
                const books_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(books_res)
            })
        },
        getUsers() {
            getUsers().then(res => {
                const users_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(users_res)
                const users_res_length = users_res.length
                if (users_res[users_res_length - 1]['name'] === '') {
                    this.dialogs.add_users.codes.rfid = users_res[users_res_length - 1]['userid']
                    this.ifAdding = true
                } else {
                    this.ifAdding = false
                }
            })
        },
        addUsers() {
            this.dialogs.add_users.show = false
            const data = {
                rfid: this.dialogs.add_users.codes.rfid,
                name: this.dialogs.add_users.codes.name,
                place: this.dialogs.add_users.codes.place
            }
            addUsers(data).then(res => {
                const users_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(users_res)
            })
        },
    },
    created() {
        this.getBooks()
        this.getUsers()
        setInterval(() => {
            setTimeout(() => {
                this.getTenData()
                if (this.dialogs.add_books.show === true) {
                    this.getBooks()
                }
                if (this.dialogs.add_users.show === true) {
                    this.getUsers()
                }
            }, 0)
        }, this.refreshTime)
    }
}
