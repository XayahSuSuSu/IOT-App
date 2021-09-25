import {getAllData} from "@/api/api";

export default {
    name: 'HistoryData',
    data() {
        return {
            headers: [
                {text: '时间', value: 'time', align: 'start'},
                {text: '温度', value: 'temp'},
                {text: '湿度', value: 'humi'},
                {text: '光照', value: 'lum'},
            ],
            desserts: [],
        }
    },
    methods: {
        getAllData() {
            getAllData().then(res => {
                const dataRes = JSON.parse(JSON.stringify(res.data.data))
                this.desserts = []
                for (let i = 0; i < dataRes.length; i++) {
                    console.log(dataRes[i]['created_at'])
                    this.desserts.push({
                        time: dataRes[i]['created_at'],
                        temp: dataRes[i]['temp'],
                        humi: dataRes[i]['humi'],
                        lum: dataRes[i]['lum'],
                    })
                }
                console.log(this.desserts)
                console.log(dataRes)
            })
        },
    },
    created() {
        this.getAllData()
    }
}
