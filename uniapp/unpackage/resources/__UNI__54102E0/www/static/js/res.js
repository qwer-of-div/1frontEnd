// mock后台数据

const chinese = ['张三', '李四', '王五', '赵六', '陈七']
const status = ['0', '1', '2', '3', '4']
const sex = ['0', '1']

// building res
const building = {
	data: {
		list: []
	}
}

for (let i = 0; i < 2000; i++) {
	building.data.list.push({
		name: chinese[i % chinese.length] + i,
		status: status[i % status.length],
		sex: sex[i % sex.length],
		date: new Date().getMilliseconds()
	})
}



export default {
	building
}
