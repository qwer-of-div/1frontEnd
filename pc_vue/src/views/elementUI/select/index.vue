<template>
  <div class="page-container">
    <div class="page-content">
      <h3>select</h3>
      <hr />
      <div>
        <menu-self :list="init.menuList"></menu-self>
      </div>
      <el-select v-model="name"
                 filterable
                 remote
                 :remote-method="remoteMethod"
                 placeholder="请选择责任人"
                 :loading="loading">
        <el-option v-for="item in options"
                   :key="item.id"
                   :label="item.label"
                   :value="item.id">
          <span>{{ item.label }}</span>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
// 菜单
const menuList = [
  { label: 'select', path: '/elementUI/select' }
]

export default {
  data () {
    return {
      name: '',
      options: [],
      loading: false,
      init: {
        menuList,
        users: JSON.parse(JSON.stringify(window.res.building.data.users))
      }
    }
  },
  methods: {
    remoteMethod (query) {
      if (!query.trim()) {
        this.options = []
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.options = this.init.users.filter(item => {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      }, 200)
    }
  }

}
</script>
