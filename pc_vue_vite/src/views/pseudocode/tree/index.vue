<template>
  <cTree :data="myData"></cTree>
</template>

<script>
import cTree from './tree1.vue'

var myData = [
  {
    'name': 'Web秀',
    'children': [{
      'name': 'web前端',
      'children': [{
        'name': 'CSS'
      }, {
        'name': 'JavaScript'
      }, {
        'name': 'Vue'
      }, {
        'name': '小程序'
      }, {
        'name': 'Three.js'
      }]
    }, {
      'name': '服务器'
    }, {
      'name': '工具类'
    }]
  }, {
    'name': '今日头条',
    'children': [{
      'name': '图片',
      'children': [{
        'name': '图片1',
        'children': [{
          'name': '图片1-1'
        }, {
          'name': '图片1-2'
        }]
      }]
    }, {
      'name': '新闻',
      'children': []
    }]
  }, {
    'name': 'Angular'
  }
];


export default {
  data () {
    return {
      myData
    }
  },
  components: { cTree }
}
</script>