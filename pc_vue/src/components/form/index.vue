<template>
  <div class="page-container">
    <div class="page-content">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               :label-position="extra.labelPosition || 'right'"
               :label-width="extra.labelWidth || 100">
        <el-row :gutter="extra.gutter || 20">
          <el-col v-for="item in formList"
                  :span="item.span || 12"
                  :key="item.id">
            <template v-if="item.type === 'slot'">
              <slot :name="item.id">
              </slot>
            </template>
            <el-form-item v-else
                          :prop="item.id"
                          :label="item.label"
                          :key="item.id">
              <el-input v-if="item.type === 'input'"
                        v-model="form[item.id]"
                        @on-change="formChangeListen(item)">
              </el-input>
              <el-select v-if="item.type === 'select'"
                         v-model="form[item.id]"
                         @on-change="formChangeListen(item)">
                <el-option :label="item.label"
                           :value="item.id"
                           v-for="item in item.options"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
