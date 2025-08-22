import store from '../reducer'
export default {
    getData(){
        fetch('https://shopapi.smartisan.com/mobile/home').then(res=>res = res.json()).then(res=>{
            if(res.code === 0){
                store.dispatch({
                    type:'DATA',
                    list:res.data
                })
            }
        })
    }
}