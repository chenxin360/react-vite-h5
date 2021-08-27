/*
 * @Author: chen-xin
 * @Date: 2021-08-17 21:29:34
 * @LastEditTime: 2021-08-17 21:31:22
 * @LastEditors: chen-xin
 * @FilePath: \react-vite-h5\src\container\Home\index.jsx
 */
import React, { useState, useEffect, useRef } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'
import BillItem from '@/components/BillItem'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'
import style from './style.module.less'
import PopupType from '@/components/PopupType'

const Home = () => {
	const typeRef = useRef() // 账单类型ref
	const [list, setList] = useState([]) // 账单列表
	const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')) // 当前筛选时间
	const [page, setPage] = useState(1) // 分页
	const [totalPage, setTotalPage] = useState(0) // 分页总数
	const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal) // 下拉刷新状态
	const [loading, setLoading] = useState(LOAD_STATE.normal) // 上拉加载状态
	const [currentSelect, setCurrentSelect] = useState({}) // 当前筛选类型

	const getBillList = async () => {
		const { data } = await get(
			`/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${
				currentSelect.id || 'all'
			}`
		)
		// 下拉刷新，重制数据
		if (page === 1) {
			setList(data.list)
		} else {
			setList(list.concat(data.list))
		}
		setTotalPage(data.totalPage)
		// 上滑加载状态
		setLoading(LOAD_STATE.success)
		setRefreshing(REFRESH_STATE.success)
	}

	// 请求列表数据
	const refreshData = () => {
		setRefreshing(REFRESH_STATE.loading)
		if (page !== 1) {
			setPage(1)
		} else {
			getBillList()
		}
	}

	const loadData = () => {
		if (page < totalPage) {
			setLoading(LOAD_STATE.loading)
			setPage(page + 1)
		}
	}

	const toggle = () => {
		typeRef.current && typeRef.current.show()
	}

	const select = item => {
		setRefreshing(REFRESH_STATE.loading)
		setPage(1)
		setCurrentSelect(item)
	}

	useEffect(
		() => {
			getBillList() // 初始化
		},
		[page],
		currentSelect
	)

	return (
		<div className={style.home}>
			<div className={style.header}>
				<div className={style.dataWrap}>
					<span className={style.expense}>
						总支出: <b>￥ 200</b>
					</span>
					<span className={style.income}>
						总收入: <b>￥ 500</b>
					</span>
				</div>
				<div className={style.typeWrap}>
					<div className={style.left}>
						<span className={style.title}>
							{currentSelect.name || '全部类型'}
							<Icon className={style.arrow} type="arrow-bottom" />
						</span>
					</div>
					<div className={style.right}>
						<span className={style.time}>
							2022-06
							<Icon className={style.arrow} type="arrow-bottom" />
						</span>
					</div>
				</div>
			</div>
			<div className={style.contentWrap}>
				{list.length ? (
					<Pull
						animationDuration={200}
						stayTime={400}
						refresh={{
							state: refreshing,
							handler: refreshData
						}}
						loading={{
							state: loading,
							distance: 200,
							handler: loadData
						}}>
						{list.map((item, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<BillItem bill={item} key={index} />
						))}
					</Pull>
				) : null}
			</div>
			<PopupType ref={typeRef} onSelect={select} />
		</div>
	)
}

export default Home
