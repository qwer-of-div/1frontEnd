<template>
  <div class="page-container">
    <div class="page-content">
      <div class="form-wrap">
        <el-form ref="form"
                 :model="parentValue"
                 label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="parentValue.partyName"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

const parentValue = {
  partyName: '子组件张三'
}

export default {
  props: {
    parentValue: {
      type: Object,
      default: () => parentValue
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
