/*
 * @Author: chen-xin
 * @Date: 2021-08-17 21:18:25
 * @LastEditTime: 2021-08-17 22:02:10
 * @LastEditors: chen-xin
 * @FilePath: \react-vite-h5\src\components\NavBar\index.jsx
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'zarm'
import { useHistory, useLocation } from 'react-router-dom'
import s from './style.module.less'

import CustomIcon from '../CustomIcon'

const NavBar = ({ showNav }) => {
    const [activeKey, setActiveKey] = useState(useLocation().pathname)
    const history = useHistory()

    const changeTab = (path) => {
        setActiveKey(path)
        history.push(path)
    }

    return (
        <TabBar
            visible={showNav}
            className={s.tab}
            activeKey={activeKey}
            onChange={changeTab}
        >
            <TabBar.Item
                itemKey="/"
                title="账单"
                icon={<CustomIcon type="zhangdan" />}
            />
            <TabBar.Item
                itemKey="/data"
                title="统计"
                icon={<CustomIcon type="tongji" />}
            />
            <TabBar.Item
                itemKey="/user"
                title="我的"
                icon={<CustomIcon type="wode" />}
            />
        </TabBar>
    )
}

NavBar.proTypes = {
    showNav: PropTypes.bool,
}

export default NavBar
