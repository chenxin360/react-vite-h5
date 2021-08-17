/*
 * @Author: chen-xin
 * @Date: 2021-08-15 20:08:55
 * @LastEditTime: 2021-08-17 21:57:57
 * @LastEditors: chen-xin
 * @FilePath: \react-vite-h5\src\App.jsx
 */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Switch, Route, useLocation } from 'react-router-dom'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'

import routes from '@/router'
import NavBar from '@/components/NavBar'

function App() {
    const location = useLocation()
    const { pathname } = location
    const needNav = ['/', '/data', '/user']
    const [showNav, setShowNav] = useState(false)

    useEffect(() => {
        setShowNav(needNav.includes(pathname))
    }, [pathname])

    return (
        <>
            <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
                <Switch>
                    {routes.map((route) => (
                        <Route exact key={route.path} path={route.path}>
                            <route.component />
                        </Route>
                    ))}
                </Switch>
            </ConfigProvider>
            <NavBar showNav={showNav} />
        </>
    )
}

export default App
