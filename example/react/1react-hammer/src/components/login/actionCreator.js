export default {
    setToken (token, userName) {
        return {
            type: 'TOKEN',
            token,
            userName
        }
    }
}