import React,{Component} from "react";
import "../public/clock.css";

class Clock extends Component{
    constructor(props){
        super(props);
        /**
         * 正确地使用 State(状态)
         *      不要直接修改 state(状态)。 通过setState修改状态react才能知道状态变更
         *      state(状态) 更新可能是异步的。 React 为了优化性能，有可能会将多个 setState() 调用合并为一次更新
         *      state(状态)更新会被合并。
         *
         * state 除了拥有并设置它的组件外，其它组件不可访问。
         */
        this.state={date:new Date()}
    }
    /**
     * componentDidMount、 componentWillUnmount 被称为：生命周期钩子
     * 钩子在组件输出被渲染到 DOM 之后运行
     */
    //挂载
    componentDidMount(){
        this.timerId=setInterval(()=>{this.tick()},1000);
        console.log(this);
    }
    //卸载
    componentWillUnmount(){
        clearInterval(this.timerId);
    }
    tick() {
        this.setState({date: new Date()});
    }
    render(){
        return <h2 className="date">it's {this.state.date.toLocaleTimeString()}</h2>
    }
}
export default Clock;