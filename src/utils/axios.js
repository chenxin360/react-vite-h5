/*
 * @Author: chen-xin
 * @Date: 2021-08-17 20:55:36
 * @LastEditTime: 2021-08-18 11:28:31
 * @LastEditors: chen-xin
 * @FilePath: \react-vite-h5\src\utils\axios.js
 */
import axios from 'axios'
import { Toast } from 'zarm'

const { MODE } = import.meta.env // 环境变量
axios.defaults.baseURL =
	MODE === 'development' ? '/api' : 'http://api.chennick.wang'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.Authorization = `${
	localStorage.getItem('token') || null
}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
	console.log(res)
	if (typeof res.data !== 'object') {
		Toast.show('服务端异常！')
		return Promise.reject(res)
	}
	if (res.data.code !== 200) {
		if (res.data.msg) Toast.show(res.data.msg)
		if (res.data.code === 401) {
			window.location.href = '/login'
		}
		return Promise.reject(res.data)
	}
	console.log('res:', res)
	return res.data
})

export default axios
