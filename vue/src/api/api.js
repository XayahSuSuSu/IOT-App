import './requests'
import {get, post, update} from '@/api/requests'

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
 * 更新图书信息
 */
export async function updateBooks(data) {
    return await update('/api/v1/books', data)
}

/**
 * 获取烟雾数据
 */
export async function getData() {
    return await get('/api/v1/data')
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