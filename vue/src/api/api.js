import './requests'
import { get } from '@/api/requests'

/**
 * 获取最新的一条data记录
 */
export async function getLatestData () {
  return await get('/api/v1/data?get=latest')
}

/**
 * 获取历史data记录
 */
export async function getAllData () {
  return await get('/api/v1/data?get=all')
}
