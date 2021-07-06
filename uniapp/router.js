import {
	RouterMount,
	createRouter
} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	// routes: [{
	// 	name: 'index',
	// 	//为了兼容其他端，此时的path不能少，必须和 pages.json中的页面路径匹配
	// 	path: "/pages/index/index",
	// 	aliasPath: '/index',
	// 	}]
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log(from,to)
	if(to.path === '/pages/index/index') {
		next('/pages/home/home');
		return
	}
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('跳转结束')
})

export {
	router,
	RouterMount
}
