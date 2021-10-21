import {addControlData, getAllControlData} from "@/api/api";

export default {
    name: 'ControlCenter',
    data() {
        return {
            search: '',
            valid: false,
            dialogs: {
                pro: {
                    show: false,
                    rules: {
                        head: [
                            v => !!v || '请输入包头代码',
                        ],
                        obj: [
                            v => !!v || '请输入对象代码',
                        ],
                        stuff: [
                            v => !!v || '请输入功能代码',
                        ],
                        param: [
                            v => !!v || '请输入参数代码',
                        ],
                        tail: [
                            v => !!v || '请输入包尾代码',
                        ],
                    },
                    codes: {
                        head: '11,6',
                        obj: '3',
                        stuff: '2',
                        param: '1,1,6',
                        tail: '204',
                        show: ''
                    }
                },
                help: {
                    show: false,
                    rules: {}
                },
            },
            paramList: [],
            headers: [
                {text: 'ID', value: 'id', align: 'start'},
                {text: '创建时间', value: 'created_at'},
                {text: '更新时间', value: 'updated_at'},
                {text: '协议码', value: 'protocol'},
                {text: '状态码', value: 'state'},
                {text: '执行状态', value: 'finished'},
            ],
            desserts: [],
        }
    },
    methods: {
        getAllControlData() {
            getAllControlData().then(res => {
                const dataRes = JSON.parse(JSON.stringify(res.data.data))
                this.desserts = []
                for (let i = 0; i < dataRes.length; i++) {
                    this.desserts.push({
                        id: dataRes[i]['id'],
                        created_at: dataRes[i]['created_at'],
                        updated_at: dataRes[i]['updated_at'],
                        protocol: dataRes[i]['protocol'],
                        state: dataRes[i]['state'].replace(/ /g, ''),
                        finished: dataRes[i]['finished'] === 1 ? '已执行' : '未执行',
                    })
                }
            })
        },
        addMyControlData() {
            if (!this.valid) {
                this.$refs.form.validate()
            } else {
                this.dialogs.pro.show = false
                // [11,6,2,3,3,1,1,6,204]
                // [11,6,2,3,3,0,1,6,204]
                addControlData(this.dialogs.pro.codes.show, '').then(() => {
                    this.getAllControlData()
                })
            }
        },
        getCode() {
            this.paramList = this.dialogs.pro.codes.param.split(',')
            this.dialogs.pro.codes.show = `[${this.dialogs.pro.codes.head},${this.dialogs.pro.codes.obj},${this.dialogs.pro.codes.stuff},${this.paramList.length},${this.dialogs.pro.codes.param},${this.dialogs.pro.codes.tail}]`
        },
    },
    created() {
        this.getAllControlData()
        this.getCode()
        setInterval(() => {
            setTimeout(() => {
                this.getAllControlData()
            }, 0)
        }, 1000)
    }
}
