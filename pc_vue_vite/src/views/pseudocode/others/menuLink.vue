<template>
  <div class="page-container">
    <div class="page-content">
      <div id="wrap">
        <div class="goodMenu"
             ref="goodMenu">
          <ul>
            <li v-for="(item ,index) in goodMenu"
                :key="index"
                :class="{active: currentIndex === index}"
                @click="selectLeft(index)"
                ref="lItem">{{ item}}</li>
          </ul>
        </div>

        <div class="goodList"
             ref="goodList">
          <ul>
            <li v-for="(items, index) in goodList"
                :key="index"
                :ref="setItemRef"
                class="a11">
              <p>{{ items.name}}</p>
              <div v-for="(item, key) in items.data"
                   :key="key">{{ item}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  data () {
    return {
      number: 30,
      goodMenu: [
        "菜单1",
        "菜单2",
        "菜单3",
        "菜单4",
        "菜单5",
        "菜单6",
        "菜单7",
        "菜单8"
      ],
      rItem: [],
      goodList: [
        { name: "菜单1", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "菜单2", data: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"] },
        { name: "菜单3", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "菜单4", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        {
          name: "菜单5",
          data: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8"]
        },
        { name: "菜单6", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "菜单7", data: ["1.1", "1.2", "1.3", "1.4", "1.1", "1.2"] },
        { name: "菜单8", data: ["1.1", "1.2", "1.1", "1.2", "1.1", "1.2"] }
      ],
      scrollY: 0, // 获取实时滚动位置
      heightList: [] //获取每一个li的高度
    };
  },
  beforeUpdate () {
    this.rItem = [];
  },
  computed: {
    //当前想要选中的菜单
    currentIndex () {
      const index = this.heightList.findIndex((item, index) => {
        return (
          this.scrollY >= this.heightList[index] &&
          this.scrollY < this.heightList[index + 1]
        )
      })
      return index > 0 ? index : 0;
    }
  },
  methods: {
    setItemRef (el) {
      this.rItem.push(el);
    },
    selectLeft (index) {
      // 点击左边菜单栏，立马高亮，不会等到右侧滚动结束后，左侧菜单栏才开始高亮（优化）
      this.scrollY = this.heightList[index];

      // 点击了左侧菜单，获取相应右侧列表的元素，并使用Bscroll提供的scrollToElement()  Api跳转
      let rItem = this.rItem;
      // let rItem = this.$refs.rItem;
      let el = rItem[index]
      this.goodmenu.scrollToElement(el, 1000)
    },
    // 初始化 better-scroll
    _scrollInit () {
      this.menuList = new Bscroll(this.$refs.goodMenu, {
        // 设置点击为true，左边菜单栏才能点击
        click: true
      });

      this.goodmenu = new Bscroll(this.$refs.goodList, {
        // 选中模式2，避免惯性的滑动也触发事件
        probeType: 2
      });

      this.goodmenu.on("scroll", pos => {
        // 获取实时滚动的距离 使用scrollY接收
        this.scrollY = Math.abs(pos.y);
      });

      this.goodmenu.on("scrollEnd", pos => {
        // 结束时触发事件获取一次位置，因为使用了模式2，惯性滚动不触发事件
        this.scrollY = Math.abs(pos.y);
      });
    },
    // 获取右侧列表每一个li的高度，存入数组中
    getHeight () {
      // 获取每一个li的高度
      // const lis = this.$refs.rItem;
      const lis = this.rItem;
      console.log(lis, 2333, this.$refs)
      // heightList的第一个元素为0
      let height = 0;
      this.heightList.push(height);
      // 之后的高度即为当前li的高度加上之前面li的高度和
      lis.forEach(item => {
        // clientHeight = content + padding
        height += item.clientHeight;
        this.heightList.push(height);
      })
    }
  },
  created () {
    // 因为 _scrollInit函数需要操作DOM，因此必须在DOM元素存在文档中才能获取DOM节点
    // 因此在 nextTick回调函数里面调用可以是实现此功能
    this.$nextTick(() => {
      this._scrollInit();
      this.getHeight();
    })
  }
}
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
#wrap {
  display: flex;
  height: 200px;
  background-color: skyblue;
}
.active {
  background-color: red;
}
.goodMenu {
  line-height: 60px;
  background-color: pink;
  overflow: hidden;
}

.goodList {
  overflow: hidden;
}
.goodList > ul {
  width: 300px;
  text-align: center;
  list-style: none;
}
</style>
