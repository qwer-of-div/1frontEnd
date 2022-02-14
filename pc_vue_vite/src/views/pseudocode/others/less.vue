<template>
  <div class="page-container">
    <div class="page-content">
      <div class="header content-wrap"
           style="margin-top:5px">
        <div class="bg-part">header混合</div>
      </div>
      <div class="main content-wrap">
        <div class="bg-part">
          <div>main混合</div>
          <div class="map-wrap">映射</div>
        </div>
      </div>
      <div class="footer content-wrap">
        <div class="bg-part">footer混合</div>
      </div>
    </div>
  </div>
</template>

<script>

import { reactive, toRefs } from "vue";

const list = [
  { label: '变量定义', path: '/vue3/variate' },
]

export default {
  setup (props, context) {
    const page = reactive({
      name: "金毛111",
      age: 4,
      list
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    return {
      form, // 这样写那么外面就要都基于page来调取, 类型{{form.age}}
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
    }
  }
}
</script>

<style lang="less" scoped>
.page-content {
  // 变量
  @width: 10px;

  // 混合（Mixins）
  .bg {
    background-color: #fff;
  }
  .bg-wrap {
    background-color: #ccc;
  }
  .bg-part {
    background-color: #096;
  }
  .top-wrap {
    margin-top: 10px;
  }
  .padding-wrap {
    padding: 10px;
  }

  .content-wrap {
    .bg-wrap();
    .top-wrap();
    .padding-wrap();
  }

  // 映射（Maps）
  #colors() {
    font1: #333;
    font2: #555;
    font-title: red;
    font-content: #ccc;

    bg1: #096;
    bg2: #69f;
    bg3: #333;
    bg-content: #fff;

    btn1: red;
  }

  #pixel() {
    margin1: 10px;
    padding1: 10px;
    echarts1: 400px;
    echarts2: 500px;
  }

  .map-wrap {
    display: inline-block;
    color: #colors[font-content];
    background-color: #colors[bg-content];
  }

  .button {
    width: #pixel[echarts2];
    height: #pixel[echarts1];
    color: #colors[font1];
    border: 1px solid #colors[font2];
  }

  // 命名空间和访问符
  #bundle() {
    .button {
      display: block;
      border: 1px solid black;
      background-color: grey;
      &:hover {
        background-color: white;
      }
    }
    .tab {
    }
  }

  #header a {
    color: orange;
    #bundle.button(); // 还可以书写为 #bundle > .button 形式
  }
}
</style>
