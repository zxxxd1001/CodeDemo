import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.addOne = this.addOne.bind(this);
    }

    addTodo() {
        this.props.store.dispatch({
            type: "ADD_TODO",
            payload: this.refs.inputVal.value
        });
    }
    addOne(){
        this.props.store.dispatch((dispatcher,state)=>{
            console.log(dispatcher,state);
            setTimeout(()=>{
                dispatcher({
                    type:"ADD_ONE",
                    payload:1
                });
            },1000)
        });
    }

    render() {
        return (
            <div className="App">
                <input type='text' ref="inputVal"/>
                <button onClick={this.addTodo}>ADD Todo</button>
                <hr/>
                <button onClick={this.addOne}>+1</button>
                {this.props.store.getState().count}
                <ul>
                    {
                        this.props.store.getState().list.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default App;
