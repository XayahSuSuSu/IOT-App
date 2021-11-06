import './requests'
import {get, post} from '@/api/requests'

const host = 'http://192.168.1.124:3307'

/**
 * 获取最新的一条data记录
 */
export async function getLatestData() {
    return await get(`${host}/api/v1/data?get=latest`)
}

/**
 * 获取历史data记录
 */
export async function getAllData() {
    return await get(`${host}/api/v1/data?get=all`)
}

/**
 * 获取控制记录
 */
export async function getAllControlData() {
    return await get(`${host}/api/v1/control?get=all`)
}

/**
 * 添加一条控制记录
 */
export async function addControlData(protocol) {
    return await post(`${host}/api/v1/control`, {
        protocol: protocol,
        state: ''
    })
}