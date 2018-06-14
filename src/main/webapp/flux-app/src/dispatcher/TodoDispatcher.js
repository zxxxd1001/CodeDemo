import {Dispatcher} from 'flux';
import Store from '../store/TodoStore';

const TodoDispatcher = new Dispatcher();
TodoDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'ADD_TODO':
            Store.addTodoData(action.payload);
            Store.emitChange();
            break;
        default:
            break;
    }
});
export default TodoDispatcher;
