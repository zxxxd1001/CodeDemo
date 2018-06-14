const CountReducer=(state=0,action={})=>{
    switch (action.type){
        case "ADD_ONE":
            return state+action.payload;
            break;
        default:
            return state;
            break;
    }
};
export default CountReducer;