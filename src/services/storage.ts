/**
 * Storage service
 * @file 本地存储服务
 * @module services/storage
 * @author Surmon <https://github.com/surmon-china>
 */

export function get<T = any>(key: string): T {
  const data = localStorage.getItem(key)
  try {
    return data ? JSON.parse(data) : data
  } catch (error) {
    return data as any
  }
}

export function set(key: string, value: any): void {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function remove(key: string): void {
  return localStorage.removeItem(key)
}

export function clear(): void {
  return localStorage.clear()
}

export default {
  get,
  set,
  remove,
  clear
}
