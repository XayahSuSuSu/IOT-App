import {getBooks} from "@/api/api";

export default {
    name: 'HistoryData',
    data() {
        return {
            books: {
                search: '',
                headers: [
                    {text: '时间', value: 'time', align: 'start'},
                    {text: 'RFID', value: 'rfid'},
                    {text: '名称', value: 'name'},
                    {text: '位置', value: 'place'},
                    {text: '借阅', value: 'userid_now'},
                    {text: '历史', value: 'userid_history'},
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
        getBooks() {
            getBooks().then(res => {
                const dataRes = JSON.parse(JSON.stringify(res.data.data))
                this.books.desserts = []
                for (let i = 0; i < dataRes.length; i++) {
                    this.books.desserts.push({
                        time: dataRes[i]['created_at'],
                        rfid: dataRes[i]['rfid'],
                        name: dataRes[i]['name'],
                        place: dataRes[i]['place'],
                        userid_now: dataRes[i]['userid_now'],
                        userid_history: dataRes[i]['userid_history'],
                    })
                }
            })
        },
    },
    created() {
        this.getBooks()
    }
}
