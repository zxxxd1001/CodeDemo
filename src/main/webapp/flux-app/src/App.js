import React, {Component} from 'react';
import TodoAction from './actions/TodoAction';
import TodoList from './comonpent/TodoList';
import Store from "./store/TodoStore";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        Store.addChangeListener(this.refreshData);
    }

    refreshData() {
        this.setState({
            list: Store.getTodoList()
        });
    }

    addTodo(data) {
        //调用action
        TodoAction.addTodo(data);
    }

    render() {
        return (
            <div className="App">
                <TodoList onClick={this.addTodo} list={this.state.list}/>
            </div>
        );
    }
}

export default App;
