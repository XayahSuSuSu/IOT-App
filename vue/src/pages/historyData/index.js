import { getData} from "@/api/api";

export default {
    name: 'HistoryData',
    data() {
        return {
            books: {
                search: '',
                headers: [
                    {text: '时间', value: 'time', align: 'start'},
                    {text: '箱内温度', value: 'tin'},
                    {text: '箱外温度', value: 'tout'},
                    {text: '箱内光照', value: 'lxin'},
                ],
                desserts: [],
            },
            data: {
                search: '',
                headers: [
                    {text: '时间', value: 'time', align: 'start'},
                    {text: '烟雾数据1', value: 'rfid'},
                    {text: '烟雾数据2', value: 'name'},
                ],
                desserts: [],
            },
            enters: {
                search: '',
                headers: [
                    {text: '时间', value: 'time', align: 'start'},
                ],
                desserts: [],
            }
        }
    },
    methods: {
        getData() {
            getData().then(res => {
                const dataRes = JSON.parse(JSON.stringify(res.data.data))
                this.books.desserts = []
                for (let i = 0; i < dataRes.length; i++) {
                    this.books.desserts.push({
                        time: dataRes[i]['created_at'],
                        tin: dataRes[i]['Tin'],
                        tout: dataRes[i]['Tout'],
                        lxin: dataRes[i]['LXin'],
                    })
                }
            })
        },
    },
    created() {
        this.getData()
    }
}
