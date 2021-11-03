import {getBooks} from "@/api/api";

export default {
    name: 'HistoryData',
    data() {
        return {
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
        }
    },
    methods: {
        getBooks() {
            getBooks().then(res => {
                const dataRes = JSON.parse(JSON.stringify(res.data.data))
                this.desserts = []
                for (let i = 0; i < dataRes.length; i++) {
                    this.desserts.push({
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
