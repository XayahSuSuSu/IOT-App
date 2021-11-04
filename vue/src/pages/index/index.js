import {addBooks, addUsers, getBooks, getData, getEnters, getUsers, updateBooks} from '@/api/api'
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
        ifBorrowingBooks: false,
        ifBorrowingUsers: false,
        ifReturning: false,
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
            borrow_books: {
                show: false,
                rules: {
                    books: {
                        rfid: [
                            v => !!v || '请输入图书编号',
                        ],
                        name: [
                            v => !!v || '请输入图书名称',
                        ],
                        place: [
                            v => !!v || '请输入存放位置',
                        ],
                        userid_now: [
                            v => !!v || '请输入借阅状态',
                        ]
                    },
                    users: {
                        rfid: [
                            v => !!v || '请输入用户编号',
                        ],
                        name: [
                            v => !!v || '请输入用户名称',
                        ]
                    }

                },
                codes: {
                    books: {
                        rfid: '',
                        name: '',
                        place: '',
                        userid_now: '',
                        userid: '',
                        userid_history: '',
                    },
                    users: {
                        rfid: '',
                        name: '',
                    }
                }
            },
            return_books: {
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
                    this.stateData[3].total = new Date().toLocaleTimeString()
                    this.chartData.rows = []
                    if (mLength < 10) {
                        for (let i = 0; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                '烟雾传感器1': dataRes[i].smoke1,
                                '烟雾传感器2': dataRes[i].smoke2,
                                '非法闯入': this.stateData[2].total
                            })
                        }
                    } else {
                        for (let i = mLength - 10; i < mLength; i++) {
                            this.chartData.rows.push({
                                'id': dataRes[i].id.toString(),
                                '烟雾传感器1': dataRes[i].smoke1,
                                '烟雾传感器2': dataRes[i].smoke2,
                                '非法闯入': this.stateData[2].total
                            })
                        }
                    }
                })
            } else {
                // this.stateData[3].total = '已停止更新'
            }
        },
        getEnters() {
            if (this.stateSwitcher) {
                getEnters().then(res => {
                    const dataRes = JSON.parse(JSON.stringify(res.data.data))
                    const mLength = dataRes.length
                    this.stateData[2].total = dataRes[mLength - 1].created_at
                    this.chartData.rows[this.chartData.rows.length - 1]['非法闯入'] = this.stateData[2].total = dataRes[mLength - 1].id
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
                    this.dialogs.return_books.codes.rfid = books_res[books_res_length - 1]['rfid']
                    this.dialogs.borrow_books.codes.books.rfid = books_res[books_res_length - 1]['rfid']
                    this.ifAdding = true
                    this.ifReturning = false
                    this.ifBorrowingBooks = false
                    for (let i = 0; i < books_res_length - 1; i++) {
                        if (books_res[books_res_length - 1]['rfid'] === books_res[i]['rfid']) {
                            this.dialogs.add_books.codes.name = books_res[i]['name']
                            this.dialogs.return_books.codes.name = books_res[i]['name']
                            this.dialogs.borrow_books.codes.books.name = books_res[i]['name']
                            this.dialogs.add_books.codes.place = books_res[i]['place']
                            this.dialogs.return_books.codes.place = books_res[i]['place']
                            this.dialogs.borrow_books.codes.books.place = books_res[i]['place']
                            this.ifAdding = false
                            this.ifReturning = true
                            this.ifBorrowingBooks = true

                            this.dialogs.borrow_books.codes.books.userid = books_res[i]['userid_now']
                            this.dialogs.borrow_books.codes.books.userid_history = books_res[i]['userid_history']

                            if (books_res[i]['userid_now'] === '') {
                                this.dialogs.borrow_books.codes.books.userid_now = '未借阅'
                                this.ifReturning = false
                            } else {
                                this.dialogs.borrow_books.codes.books.userid_now = '已借阅'
                                this.ifBorrowingBooks = false
                                this.ifReturning = true
                            }
                            break
                        }
                    }
                } else {
                    this.ifAdding = false
                    this.ifReturning = false
                    this.ifBorrowingBooks = false
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
                this.dialogs.add_books.codes.rfid = ''
                this.dialogs.add_books.codes.name = ''
                this.dialogs.add_books.codes.place = ''
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
                    this.dialogs.borrow_books.codes.users.rfid = users_res[users_res_length - 1]['userid']
                    this.ifAdding = true
                    this.ifBorrowingUsers = false
                    for (let i = 0; i < users_res_length - 1; i++) {
                        if (users_res[users_res_length - 1]['userid'] === users_res[i]['userid']) {
                            this.dialogs.add_users.codes.name = users_res[i]['name']
                            this.dialogs.borrow_books.codes.users.name = users_res[i]['name']
                            this.ifAdding = false
                            this.ifBorrowingUsers = true
                            break
                        }
                    }
                } else {
                    this.ifAdding = false
                    this.ifBorrowingUsers = false
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
                this.dialogs.add_users.codes.rfid = ''
                this.dialogs.add_users.codes.name = ''
                console.log(users_res)
            })
        },
        borrowBooks() {
            this.dialogs.borrow_books.show = false
            const data = {
                rfid: this.dialogs.borrow_books.codes.books.rfid,
                userid_now: this.dialogs.borrow_books.codes.users.rfid,
                userid_history: this.dialogs.borrow_books.codes.books.userid_history,
            }
            updateBooks(data).then(res => {
                const borrow_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(borrow_res)
            })
        },
        returnBooks() {
            this.dialogs.return_books.show = false
            const data = {
                rfid: this.dialogs.borrow_books.codes.books.rfid,
                userid_now: '',
                userid_history: this.dialogs.borrow_books.codes.books.userid_history + this.dialogs.borrow_books.codes.books.userid + ',',
            }
            updateBooks(data).then(res => {
                const return_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(return_res)
            })
        },
    },
    created() {
        setInterval(() => {
            setTimeout(() => {
                this.getTenData()
                this.getEnters()
                if (this.dialogs.add_books.show === true || this.dialogs.borrow_books.show === true || this.dialogs.return_books.show === true) {
                    this.getBooks()
                }
                if (this.dialogs.add_users.show === true || this.dialogs.borrow_books.show === true) {
                    this.getUsers()
                }
            }, 0)
        }, this.refreshTime)
    }
}
