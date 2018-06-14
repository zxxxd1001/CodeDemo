import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';

import home from './myRouter/home.js';
import {Def, News} from './myRouter/news.js';

class App extends Component {
    render() {
        var date = new Date();
        var param = "/News/张三";
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p>{date.toLocaleTimeString()}</p>
                <div>
                    <Router>
                        <div>
                            <a href='/'>home </a>
                            <a href={param}> news </a>
                            <Link to='/'> home </Link>
                            <Link to='/News/10010'> news </Link>
                            <NavLink exact activeClassName='active2' to='/'> home </NavLink>
                            <NavLink activeClassName='active2' to='/News'> news </NavLink>
                            <br/>
                            <Link to='/def/123'> 数字正则测试 </Link>
                            <Link to='/def/1234'> 数字长度测试正则测试 </Link>
                            <hr/>
                            <Switch>
                                <Route exact path='/' component={home}/>
                                <Route path='/News/:name?' component={News}/>
                                <Route path='/def/:sum(\d{4})' component={Def}/>
                                <Redirect from='/*' to='/'/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

/**
 * http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
 * NavLink
 * 重要属性：
 *      activeClassName 激活状态时的class
 *      activeStyle 激活状态时的style
 *      exact 是否精确匹配路径
 *      isActive 参数为function，用来判断是否需要把链接设为active状态
 *
 * exact 精确匹配选中的元素会被显示
 *
 * 动态传参
 *      /News/:name 类似java PathParam 路径参数
 *      无参数链接 /News/:name? 类似java PathParam 路径参数
 *      正则匹配
 *
 * 重定向标签
 *      Redirect 最外层需要套用Switch标签
 */
export default App;
