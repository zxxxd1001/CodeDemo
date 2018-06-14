import React from 'react';

class TodoList extends React.Component {
    render() {
        return (
            <div>
                <input type='text' ref='todoVal'/>
                <button onClick={() => this.props.onClick(this.refs.todoVal.value)}>ADD ToDo</button>
                <ul>
                    {
                        this.props.list.map(function (item, index) {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;