import React, { useState, useEffect } from 'react'
import ProTypes from 'prop-types'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

import { Cell } from 'zarm'
import style from './style.module.less'
import CustomIcon from '../CustomIcon'
import { typeMap } from '@/utils'

const BillItem = ({ bill }) => {
	const [income, setIncome] = useState(0) // 收入
	const [expense, setExpense] = useState(0) // 支出
	const history = useHistory() // 路由实例

	useEffect(() => {
		const incomes = bill.bills
			.filter(i => i.pay_type === 2)
			.reduce((curr, item) => {
				// eslint-disable-next-line no-param-reassign
				curr += Number(item.amount)
				return curr
			}, 0)
		setIncome(incomes)
		const expenses = bill.bills
			.filter(i => i.pay_type === 1)
			.reduce((curr, item) => {
				// eslint-disable-next-line no-param-reassign
				curr += Number(item.amount)
				return curr
			}, 0)
		setExpense(expenses)
	}, [bill.bills])

	const goToDetail = item => {
		history.push(`/detail?id=${item.id}`)
	}

	return (
		<div className={style.item}>
			<div className={style.headerDate}>
				<div className={style.date}>{bill.date}</div>
				<div className={style.money}>
					<span>
						<img
							src="//s.yezgea02.com/1615953405599/zhi%402x.png"
							alt="支出"
						/>
						<span>￥{expense.toFixed(2)}</span>
					</span>
					<span>
						<img
							src="//s.yezgea02.com/1615953405599/shou%402x.png"
							alt="收"
						/>
						<span>￥{income.toFixed(2)}</span>
					</span>
				</div>
			</div>
			{bill &&
				bill.bills.map(item => (
					<Cell
						className={style.bill}
						key={item.id}
						onClick={() => goToDetail(item)}
						title={
							<>
								<CustomIcon
									className={style.itemIcon}
									type={
										item.pay_id
											? typeMap[item.type_id].icon
											: 1
									}
								/>
								<span>{item.type_name}</span>
							</>
						}>
						description=
						<span
							style={{
								color: item.pay_type === 2 ? 'red' : '#39be77'
							}}>{`${item.pay_type === 1 ? '-' : '+'}
							${item.amount}`}</span>
						help=
						<div>
							{dayjs(Number(item.date)).format('HH:mm')}{' '}
							{item.remark ? `| ${item.remark}` : ''}
						</div>
					</Cell>
				))}
		</div>
	)
}

BillItem.propTypes = {
	bill: ProTypes.object
}

export default BillItem
