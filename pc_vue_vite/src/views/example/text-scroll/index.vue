<template>
  <div class="wrapper">
    <div class="marquee-wrapper">
      <div class="marquee-text">
        这是第一行横向滚动的提示文字信息
      </div>
      <div class="marquee-text">
        这是第一行横向滚动的提示文字信息
      </div>
    </div>
  </div>
</template>

<script>
// 文字走马灯
const navList = [
  { label: "keepAlive", name: 'keepAlive' },
]

export default {
  data () {
    return {
      page: {
      },
      init: {
        navList
      }
    }
  },
  created () {
    console.log(this.$route, this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-20%, -50%);

  width: 600px;
  height: 60px;
  overflow: hidden;
  border: 4px solid red;
  border-radius: 5px;
}

.marquee-wrapper {
  display: flex;
  align-items: center;
  width: 200%;
  height: 100%;
  transform: translateX(0);
  animation: move 6s infinite linear;
  animation-delay: 3s;
  /*text-shadow: 1325px 0;*/
}

.marquee-text {
  width: 100%;
  font-size: 20px;
  white-space: nowrap;
  /*background-color: red;*/
}

.marquee-text:nth-child(2) {
  /* color: red; */
}

@keyframes move {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>