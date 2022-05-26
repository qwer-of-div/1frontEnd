<template>
    <div>
        <div>login</div>
        <div>
            <el-button type="primary" @click="onLogin('admin')">管理员</el-button>
            <el-button type="primary" @click="onLogin('user')">所有人</el-button>
        </div>
    </div>
</template>

<script>
import { reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { useStore } from "vuex";

export default {
    setup() {
        const { proxy, ctx } = getCurrentInstance()
        const router = useRouter();
        const store = useStore()

        const onLogin = async (type) => {
            const res = await proxy.$api.getLogin()
            if(res.code === 200) {
                console.log('getLogin', res)
                const userInfo = JSON.parse(JSON.stringify(res.data))
                if(type === 'user') userInfo.routerList.shift()
                store.commit('user/userInfoSet', userInfo)
                store.commit('user/addRoute')
                router.push('/')
            }
        }
        return {
            onLogin
        }
    }
}
</script>
