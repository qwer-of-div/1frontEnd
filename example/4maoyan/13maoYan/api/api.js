import {api} from './interceptor.js'

const baseUrl = 'https://m.maoyan.com'
const defaultParams = {
	optimus_uuid: '25710560F33D11EAB773B3D99778E947F971F2DF64934BF1BFBC56344C2A161F',
	optimus_risk_level: 71,
	optimus_code: 10
}

export default {
	// 热门电影列表
	getmovieOnInfoList () {
		return api.get ( baseUrl + '/ajax/movieOnInfoList', {
				    params: {
						token: '',
						...defaultParams
					}, /* 会加在url上 */
				    dataType: 'json',
				    // #ifdef MP-ALIPAY || MP-WEIXIN
				    timeout: 5000, // 仅微信小程序（2.10.0）、支付宝小程序支持
				    // #endif
				})
	},
	// 电影列表
	getmoreComingList (params) {
		return api.get (baseUrl + '/ajax/moreComingList', {
				    params: {
						movieIds: params.movieIds,
						token: '',
						...defaultParams
					}, /* 会加在url上 */
				    dataType: 'json',
				    // #ifdef MP-ALIPAY || MP-WEIXIN
				    timeout: 5000, // 仅微信小程序（2.10.0）、支付宝小程序支持
				    // #endif
				})
	},
	// 影院电影信息
	getdetailmovie (params) {
		return api.get (baseUrl + '/ajax/detailmovie', {
				    params: {
						movieId: params.movieId,
						...defaultParams
					}, /* 会加在url上 */
				    dataType: 'json',
				    // #ifdef MP-ALIPAY || MP-WEIXIN
				    timeout: 5000, // 仅微信小程序（2.10.0）、支付宝小程序支持
				    // #endif
				})
	},
	// 影院 当天电影信息
	getmovie (params) {
		return api.post (baseUrl + '/ajax/movie?forceUpdate=1600069578133', {
						movieId: params.movieId,
						day: params.day,
						cityId: params.cityId,
						updateShowDay: true,
						...defaultParams
				})
	}
}