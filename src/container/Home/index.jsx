/*
 * @Author: chen-xin
 * @Date: 2021-08-17 21:29:34
 * @LastEditTime: 2021-08-17 21:31:22
 * @LastEditors: chen-xin
 * @FilePath: \react-vite-h5\src\container\Home\index.jsx
 */
import React from 'react'
import {Icon} from "zarm";
import style from './style.module.less'

const Home = () => {
    return <div className={style.home}>
        <div className={style.header}>
            <div className={style.dataWrap}>
                <span className={style.expense}>总支出: <b>￥ 200</b></span>
                <span className={style.income}>总收入: <b>￥ 500</b></span>
            </div>
            <div className={style.typeWrap}>
                <div className={style.left}>
                    <span className={style.title}>类型 <Icon className={style.arrow} type="arrow-bottom"/></span>
                </div>
                <div className={style.right}>
                    <span className={style.time}>2022-06<Icon className={style.arrow} type="arrow-bottom"/></span>
                </div>
            </div>
        </div>
    </div>
}

export default Home
