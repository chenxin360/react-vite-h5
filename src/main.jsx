/*
 * @Author: chen-xin
 * @Date: 2021-08-15 20:08:55
 * @LastEditTime: 2021-08-17 21:55:41
 * @LastEditors: chen-xin
 * @FilePath: \react-vite-h5\src\main.jsx
 */
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './index.css'
import 'lib-flexible/flexible'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)
