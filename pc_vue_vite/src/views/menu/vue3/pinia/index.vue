<template>
  <div>
    <div>{{ statusStore.flag }}</div>
    <div>{{ statusStore.doubleFlag }}</div>
    <el-button type="primary" @click="onEdit(1)">直接修改</el-button>
    <el-button type="primary" @click="onEdit(2)">$patch修改</el-button>
    <el-button type="primary" @click="onEdit(3)">actions修改</el-button>
    <div>
      storeToRefs值{{ flag }} {{ isShow }}
    </div>
  </div>
</template>

<script setup>
// 引入
import { storeToRefs } from "pinia";
// 引入useStatusStore
import { useStatusStore } from "@/pinia/status";

// statusStore是一个reactive响应式对象
const statusStore = useStatusStore()

// 读取flag
// statusStore是reactive响应式对象，但是里面的属性是ref的响应式对象
// 虽然是ref响应式对象，但是读取不需要.value，只有我们手动ref(xx)创建数据的时候需要.value
console.log(statusStore.flag)
// 通过$state读取,$state是一个特殊的属性，
// 它代表了整个 store（仓库）的状态对象。这个状态对象包含了所有在state函数中定义的状态属性

// 也可以这样读取
console.log(statusStore.$state.flag)

const onEdit = (type) => {
  if (type === 1) {
    // 直接修改即可，不需要像vuex一样提交方法
    statusStore.flag++
    return
  }
  if (type === 2) {
    //patch用于批量更新 store中的状态
    //参数是一个对象，要修改的数据名-要改的值，支持批量修改
    statusStore.$patch({
      // flag改成1  isShow改成false
      flag: 1,
      isShow: !statusStore.isShow
    })
    return
  }
  if (type === 3) {
    statusStore.setFlag(2)
    return
  }
}


// let {flag,isShow} = statusStore  如果直接解构拿取数据，会丢失响应式

// 使用toRefs解构，可以实现解构并且响应式，但是是将数据、方法都转换了，不管有没有用
// let {flag,isShow} = toRefs(statusStore)


// 使用storeToRefs解构，只会关注Store里面的数据，不关注方法
let { flag, isShow } = storeToRefs(statusStore)

</script>