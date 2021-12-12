import './requests'
import {get, post, update} from '@/api/requests'

const baseUrl = "http://192.168.1.219:3307"

/**
 * 获取箱内温度
 */
export async function getData() {
    return await get(baseUrl + '/api/v1/data')
}

/**
 * 添加储运箱信息
 */
export async function addBox(data) {
    return await post(baseUrl + '/api/v1/box', data)
}

/**
 * 获取物品记录
 */
export async function getObj() {
    return await get(baseUrl + '/api/v1/pid')
}

/**
 * 添加物品信息
 */
export async function addObj(data) {
    return await post(baseUrl + '/api/v1/pid', data)
}

/**
 * 更新用户信息
 */
export async function updateUsers(data) {
    return await update(baseUrl + '/api/v1/users', data)
}


/**
 * 获取控制记录
 */
export async function getAllControlData() {
    return await get(baseUrl + '/api/v1/control?get=all')
}

/**
 * 添加一条控制记录
 */
export async function addControlData(protocol) {
    return await post(baseUrl + '/api/v1/control', {
        protocol: protocol,
        state: '',
        finished: 0
    })
}

/**
 * 获取非法闯入数据
 */
export async function getEnters() {
    return await get(baseUrl + '/api/v1/enters')
}
