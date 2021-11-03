import './requests'
import {get, post} from '@/api/requests'

/**
 * 获取图书记录
 */
export async function getBooks() {
    return await get('/api/v1/books')
}

/**
 * 添加图书信息
 */
export async function addBooks(data) {
    return await post('/api/v1/books', data)
}

/**
 * 获取控制记录
 */
export async function getAllControlData() {
    return await get('/api/v1/control?get=all')
}

/**
 * 添加一条控制记录
 */
export async function addControlData(protocol) {
    return await post('/api/v1/control', {
        protocol: protocol,
        state: ''
    })
}