import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const initState = {
    list:[]
}

const reducer  = (state = initState, action) => {
    switch (action.type) {
        case 'DATA':
        let newList = action.list
            return {...state,list:newList}
        default:
            return state
    }
}

var store = createStore(reducer,applyMiddleware(thunk));
export default store;