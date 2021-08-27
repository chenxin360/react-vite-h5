import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon } from 'zarm'
import cx from 'classnames'
import { get } from '@/utils'
import style from './style.module.less'

// forwardRef 用于拿到父组件传入的 ref 属性，这样在父组件便能通过 ref 控制子组件。
const PopupType = forwardRef(({ onSelect }, ref) => {
	const [show, setShow] = useState(false) // 组件的显示与否
	const [active, setActive] = useState('all') // 组件激活type
	const [expense, setExpense] = useState([]) // 支出类型标签
	const [income, setIncome] = useState([]) // 收入类型标签

	useEffect(async () => {
		const {
			data: { list }
		} = await get('/api/type/list')
		setExpense(list.filter(i => i.type === 1))
		setIncome(list.filter(i => i.type === 2))
	}, [])

	if (ref) {
		// 外部可以通过 ref.current.show 来控制组件的显示
		ref.current = {
			show: () => {
				setShow(true)
			},
			close: () => {
				setShow(false)
			}
		}
	}

	// 选择类型回调
	const choseType = item => {
		setActive(item.id)
		setShow(false)
		onSelect(item)
	}

	return (
		<Popup
			visible={show}
			direction="bottom"
			onMaskClick={() => setShow(false)}
			destroy={false}
			mountContainer={() => document.body}>
			<div className={style.popupType}>
				<div className={style.header}>
					请选择类型
					<Icon
						type="wrong"
						className={style.cross}
						onClick={() => setShow(false)}
					/>
				</div>
			</div>
			<div className={style.content}>
				<div
					onClick={() => choseType({ id: 'all' })}
					className={cx({
						[style.all]: true,
						[style.active]: active === 'all'
					})}>
					全部类型
				</div>
				<div className={style.title}>支出</div>
				<div className={style.expenseWrap}>
					{expense.map(item => (
						<p
							key={item.id}
							onClick={() => choseType(item)}
							className={cx({
								[style.active]: active === item.id
							})}>
							{item.name}
						</p>
					))}
				</div>
				<div className={style.title}>收入</div>
				<div className={style.incomeWrap}>
					{income.map(item => (
						<p
							key={item.id}
							onClick={() => choseType(item)}
							className={cx({
								[style.active]: active === item.id
							})}>
							{item.name}
						</p>
					))}
				</div>
			</div>
		</Popup>
	)
})

PopupType.propTypes = {
	onSelect: PropTypes.func
}

export default PopupType
