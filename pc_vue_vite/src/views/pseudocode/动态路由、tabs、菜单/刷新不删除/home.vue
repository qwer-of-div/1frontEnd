<template>
    <div class="page-container">
        <div class="page-content flex-col">
            <div>home</div>
            <div>
                <el-button type="primary" @click="onExit">logout</el-button>
            </div>
            <div class="header-wrap flex">
                 <div class="left-wrap" style="width:15%">
                </div>
                <div class="right-wrap flex1">
                    <div class="tabs-wrap">
                        <tabs-self></tabs-self>
                    </div>  
                </div>
            </div>
            <div class="main-wrap flex1 flex">
                <div class="left-wrap" style="width:15%;">
                     <el-scrollbar style="height:100%">
                        <menu-self :menuList="newPage.menuList"></menu-self>
                    </el-scrollbar>
                </div>
                <div class="right-wrap flex1">
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menuSelf from "./components/menu/menu.vue";
import tabsSelf from "./components/menu/tabs.vue";

import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

export default {
    components: {
        menuSelf,
        tabsSelf
     },
    setup() {
        const router = useRouter();
        const store = useStore()

        const newPage = computed(() => {
            const page1 = {}
            page1.menuList = [{...store.state.user.dic.homeRouter}, ...store.state.user.userInfo.routerList]
            return page1
        })

        const onExit = () => {
            store.dispatch('resetState')
            router.push('/login')
        }
        return {
            onExit,
            newPage
        }
    }
}
</script>

<style lang="less" scoped>
.page-content {
    .main-wrap {
    }
}
</style>
