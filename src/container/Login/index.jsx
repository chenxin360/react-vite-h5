/*
 * @Author: chen-xin
 * @Date: 2021-08-17 22:04:59
 * @LastEditTime: 2021-08-23 15:36:04
 * @LastEditors: chen-xin
 * @FilePath: \react-vite-h5\src\container\Login\index.jsx
 */
import React, { useState, useCallback } from 'react'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import Captcha from 'react-captcha-code'
import cx from 'classnames'
import { useHistory } from 'react-router-dom'
import CustomIcon from '@/components/CustomIcon'
import style from './style.module.less'
import { post } from '@/utils'

const Login = () => {
	const [username, setUsername] = useState('') // 账号
	const [password, setPassword] = useState('') // 密码
	const [verify, setVerify] = useState('') // 验证码
	const [captcha, setCaptcha] = useState('')
	const [type, setType] = useState('login')
	const [btnLoading, setBtnLoading] = useState(false)

	// 验证码变化回调方法
	// eslint-disable-next-line no-shadow
	const handleChange = useCallback(captcha => {
		setCaptcha(captcha)
	}, [])

	const history = useHistory()

	// 登录注册方法
	const onSubmit = async () => {
		if (!username) {
			Toast.show('请输入账号')
			return
		}
		if (!password) {
			Toast.show('请输入密码')
			return
		}
		try {
			// setBtnLoading(true)
			if (type === 'login') {
				const { data } = await post('/api/user/login', {
					username,
					password
				})
				console.log('data:', data)
				if (data && data.token) {
					localStorage.setItem('token', data.token)
					console.log(history)
					history.push('/data')
				}
			} else {
				if (!verify) {
					Toast.show('请输入验证码')
					return
				}
				if (verify !== captcha) {
					Toast.show('验证码错误')
					return
				}
				const { data } = await post('/api/user/register', {
					username,
					password
				})
				Toast.show('注册成功')
				setType('login')
			}
			setBtnLoading(false)
		} catch (error) {
			console.log('error:', error)
			Toast.show(error.msg)
			setBtnLoading(false)
		}
	}

	return (
		<div className={style.auth}>
			<div className={style.head} />
			<div className={style.tab}>
				<span
					className={cx({ [style.active]: type === 'login' })}
					onClick={() => setType('login')}
					onKeyPress={() => setType('login')}
					aria-hidden>
					登录
				</span>
				<span
					className={cx({ [style.active]: type === 'register' })}
					onClick={() => setType('register')}
					onKeyPress={() => setType('register')}
					aria-hidden>
					注册
				</span>
			</div>
			<div className={style.form}>
				<Cell icon={<CustomIcon type="zhanghao" />}>
					<Input
						clearable
						type="text"
						placeholder="请输入账号"
						onChange={value => setUsername(value)}
					/>
				</Cell>
				<Cell icon={<CustomIcon type="mima" />}>
					<Input
						clearable
						type="password"
						placeholder="请输入密码"
						onChange={value => setPassword(value)}
					/>
				</Cell>
				{type === 'register' ? (
					<Cell icon={<CustomIcon type="mima" />}>
						<Input
							clearable
							type="text"
							placeholder="请输入验证码"
							onChange={value => setVerify(value)}
						/>
						<Captcha charNum={4} onChange={handleChange} />
					</Cell>
				) : null}
			</div>
			<div className={style.operation}>
				{type === 'register' ? (
					<div className={style.agree}>
						<Checkbox />
						<label className="text-light">
							阅读并同意<a>《掘掘手札条款》</a>
						</label>
					</div>
				) : null}
				<Button onClick={onSubmit} block theme="primary">
					{type === 'register' ? '注册' : '登录'}
				</Button>
			</div>
		</div>
	)
}
export default Login
