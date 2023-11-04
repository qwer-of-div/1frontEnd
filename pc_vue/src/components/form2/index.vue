<template>
  <div class="page-container">
    <div class="page-content">
      <el-form ref="form"
               :model="form"
               :rules="rules">
        <ul>
          <li v-for="item in formList"
              :span="item.span || 12"
              :key="item.id">
            <label :for="item.id"><em v-if="item.required">*</em>{{item.label}}</label>
            <el-form-item :prop="item.id"
                          :key="item.id">
              <el-input v-if="item.type === 'input'"
                        v-model="form[item.id]"
                        @on-change="formChangeListen(item)">
              </el-input>
              <el-select v-if="item.type === 'select'"
                         v-model="form[item.id]"
                         @on-change="formChangeListen(item)">
              </el-select>
              <template v-if="item.type === 'slot'">
                <slot :name="item.id">
                </slot>
              </template>
            </el-form-item>
          </li>
        </ul>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => { return {} }
    },
    rules: {
      type: Object,
      default: () => { }
    },
    extra: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    formChangeListen (item) {
      this.$emit('formChangeListen', item)
    }
  }
}
</script>
