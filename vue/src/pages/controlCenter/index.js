import {addControlData, getAllControlData} from "@/api/api";

export default {
    name: 'ControlCenter',
    data() {
        return {
            valid: false,
            objSelected: '',
            actionSelected: '',
            dialog: false,
            objRules: [
                v => !!v || '请选择控制对象',
            ],
            actionRules: [
                v => !!v || '请选择控制指令',
            ],
            headers: [
                {text: 'ID', value: 'id', align: 'start'},
                {text: '时间', value: 'time'},
                {text: '对象', value: 'obj'},
                {text: '指令', value: 'action'},
                {text: '状态', value: 'state'},
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
                    console.log(dataRes[i]['created_at'])
                    this.desserts.push({
                        id: dataRes[i]['id'],
                        time: dataRes[i]['created_at'],
                        obj: dataRes[i]['obj'],
                        action: dataRes[i]['action'],
                        state: dataRes[i]['state'],
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
                addControlData('fan', 1).then(res => {
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
