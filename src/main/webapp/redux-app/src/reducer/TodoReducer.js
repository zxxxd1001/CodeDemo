const TodoListReducer=(state={list:[]},action={})=>{
    switch (action.type){
        case "ADD_TODO":
            const newState=[...state];
            newState.push(action.payload);
            return newState;
            break;
        default:
            return state;
            break;
    }
};
export default TodoListReducer;