import React from 'react';
import Footer from './components/Footer/footer'
import '@/assets/swiper/css/swiper.min.css'
// 从路由中导出我们需要的模块
import {Route,Redirect,Switch} from 'react-router-dom'

import './App.css';

function App() {
  return (
    <div className="App">
    {/* NavLink 用来配置点击时对应的路由 */}
          {/* switch 用来渲染唯一匹配的路由 */}
        <Switch>
        {/* route用来配置路径对应的路由 */}
        <Route path="/" component={Footer}></Route>
        {/* 路由重定向redirect，当我们进来的时候将会加载默认的路由 */}
        <Redirect from="/" to="/"></Redirect>
        </Switch>
    </div>
  );
}

export default App;
