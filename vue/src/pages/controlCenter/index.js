import {addControlData, getAllControlData} from "@/api/api";

export default {
    name: 'ControlCenter',
    data() {
        return {
            valid: false,
            objCode: '2',
            actionCode: '3',
            paramCode: '1,1,6',
            dialog: false,
            objRules: [
                v => !!v || '请输入对象代码',
            ],
            actionRules: [
                v => !!v || '请输入控制代码',
            ],
            paramRules: [
                v => !!v || '请输入参数代码',
            ],
            headers: [
                {text: 'ID', value: 'id', align: 'start'},
                {text: '创建时间', value: 'created_at'},
                {text: '更新时间', value: 'updated_at'},
                {text: '协议码', value: 'protocol'},
                {text: '状态', value: 'finished'},
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
                const paramList = this.paramCode.split(',')
                const protocol = `[11,6,${this.objCode},${this.actionCode},${paramList.length},${this.paramCode},204]`
                console.log(protocol)
                addControlData(protocol).then(res => {
                    this.getAllControlData()
                    console.log(res)
                })
            }
        }
    },
    created() {
        this.getAllControlData()
    }
}
