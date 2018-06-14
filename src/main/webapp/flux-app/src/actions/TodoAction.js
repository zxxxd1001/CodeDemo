import TodoDispatcher from '../dispatcher/TodoDispatcher';

const TodoAction = {
    addTodo: function (data) {
        TodoDispatcher.dispatch({
            actionType: 'ADD_TODO',
            payload: data
        });
    }
};
export default TodoAction;