import {addControlData, getAllControlData} from "@/api/api";

export default {
    name: 'ControlCenter',
    data() {
        return {
            search: '',
            valid: false,
            headCode: '11,6',
            stuffCode: '2',
            objCode: '3',
            paramCode: '1,1,6',
            tailCode: '204',
            paramList: [],
            showCode: '',
            dialog: false,
            headRules: [
                v => !!v || '请输入包头代码',
            ],
            stuffRules: [
                v => !!v || '请输入功能代码',
            ],
            objRules: [
                v => !!v || '请输入对象代码',
            ],
            paramRules: [
                v => !!v || '请输入参数代码',
            ],
            tailRules: [
                v => !!v || '请输入包尾代码',
            ],
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
                        finished: dataRes[i]['finished'],
                    })
                }
                console.log(this.desserts)
                console.log(dataRes)
            })
        },
        addMyControlData() {
            console.log(this.valid)
            if (!this.valid) {
                this.$refs.form.validate()
            } else {
                this.dialog = false
                // [11,6,2,3,3,1,1,6,204]
                // [11,6,2,3,3,0,1,6,204]
                addControlData(this.showCode, '').then(res => {
                    this.getAllControlData()
                    console.log(res)
                })
            }
        },
        getCode() {
            this.paramList = this.paramCode.split(',')
            this.showCode = `[${this.headCode},${this.stuffCode},${this.objCode},${this.paramList.length},${this.paramCode},${this.tailCode}]`
        }
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
