


var initState = {
    xin: {
        token: localStorage.getItem('userToken'),
        userName: localStorage.getItem('userName'),
    }
}



export default (state = initState, action) => {
    switch (action.type) {

    case 'TOKEN':
        let newState = state;
        let {xin} = newState
        xin.token = action.token
        xin.userName = action.userName
        localStorage.setItem('userToken', action.token)
        localStorage.setItem('userName', action.userName)
        return newState

    default:
        return state
    }
}
