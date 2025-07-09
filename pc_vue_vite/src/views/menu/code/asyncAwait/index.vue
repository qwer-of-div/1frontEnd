<template>
  <div>
    <h3>asyncAwait</h3>
    <el-button @click="getList">async/await</el-button>
    <el-button @click="funcBack">async/await函数返回</el-button>
  </div>
</template>

<script>
// 最终返回的结果仍然是按照promise的添加顺序返回的
import { reactive } from "vue";

export default {
  setup () {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      name: "金毛",
      age: 4
    })
    const flag = reactive({
      isShow: false,
      popupShow: false
    })

    const count = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(100)
        }, 500)
      })
    }

    const list = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([1, 2, 3])
        }, 500)
      })
    }

    const getList = async () => {
      // 最终返回的结果仍然是按照promise的添加顺序返回的
      const result = await Promise.all([count(), list()])
      console.log(result, 'async/await同步')
    }

    const funcBackBefore = async () => {
      let res = {}
      try {
        const result = await list()
        res = {
          status: 'success',
          data: result
        }
        console.log(result, result1, 'funcBackBefore-success函数返回')
      } catch (error) {
        res = {
          status: 'error',
          data: {}
        }
        console.log(error, 'funcBackBefore-error函数返回')
        // throw '不符合的值'
      }
      // return res
    }

    const funcBack = async () => {
      // 最终返回的结果仍然是按照promise的添加顺序返回的
      try {
        const result = await funcBackBefore()
        console.log(result, 'funcBack函数返回')
      } catch (error) {
        console.log(error, 'funcBack-error函数返回')
      }
    }

    return {
      ...page, // 这样写不好, 里面会失去响应式
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      count,
      list,
      getList,
      funcBack
    }
  }
}
</script>
