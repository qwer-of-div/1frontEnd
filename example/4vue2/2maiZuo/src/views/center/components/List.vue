
<template>
<div>
    <input type="text" v-model="content">
    <button ref="tar" type="button" name="button" @click="testClick">{{ content }}</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            content: '初始值'
        }
    },
    methods: {
 testClick1(){
              this.content = '改变了的值';
              // 这会直接打印的话， 由于dom元素还没有更新， 因此打印出来的还是未改变之前的值；
              console.log(this.$refs.tar.innerText);//初始值
           },
           testClick(){
              this.content = '改变了的值';
              this.$nextTick(() => {
                  // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
                  console.log(this.$refs.tar.innerText); //改变了的值
              })
           }



    }
    
}
</script>


