import {addBooks, getBooks} from "@/api/api";

export default {
    name: 'ControlCenter',
    data() {
        return {
            search: '',
            ifAdding: false,
            valid: false,
            dialogs: {
                add_books: {
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
                        head: '',
                        obj: '',
                        stuff: '2',
                        param: '1,1,6',
                        tail: '',
                        show: ''
                    }
                },
            },
        }
    },
    methods: {
        getBooks() {
            getBooks().then(res => {
                const books_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(books_res)
                const books_res_length = books_res.length
                if (books_res[books_res_length - 1]['name'] === '') {
                    this.dialogs.add_books.codes.head = books_res[books_res_length - 1]['rfid']
                    this.ifAdding = true
                } else {
                    this.ifAdding = false
                }
            })
        },
        addBooks() {
            this.dialogs.add_books.show = false
            const data = {
                rfid: this.dialogs.add_books.codes.head,
                name: this.dialogs.add_books.codes.tail,
                place: this.dialogs.add_books.codes.obj
            }
            addBooks(data).then(res => {
                const books_res = JSON.parse(JSON.stringify(res.data.data))
                console.log(books_res)
            })
        },
    },
    created() {
        this.getBooks()
        setInterval(() => {
            setTimeout(() => {
                this.getBooks()
            }, 0)
        }, 1000)
    }
}
