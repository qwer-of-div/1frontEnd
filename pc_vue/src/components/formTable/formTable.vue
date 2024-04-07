<template>
  <div class="page-container">
    <div class="page-content">
      <Form ref="formTable"
            :model="form"
            :rules="rules">
        <div class="tablelist unify_table_css">
          <table border="0"
                 cellspacing="0"
                 cellpadding="0">
            <tr>
              <th v-for="item in tableList"
                  :key="item.id">{{item.label}}</th>
            </tr>
            <tr v-for="(it,index) in tableData"
                :key="index">
              <td v-for="item in tableList"
                  :key="item.id">
                <span v-if="item.type === 'text'">{{it[item.id]}}</span>
                <template v-else-if="item.type === 'slot'">
                  <slot :name="item.id"
                        :it="it"
                        :index="index"></slot>
                </template>
                <FormItem v-else
                          :prop="item.id">
                  <Input v-model="it[item.id]"
                         v-if="item.type === 'input'"
                         :disabled="item.disabled"
                         @on-change="onFormChange(item)" />
                  <Select v-model="it[item.id]"
                          v-else-if="item.type === 'select'"
                          @on-change="onFormChange(item)"
                          :disabled="disabledListen(item, it)"
                          transfer>
                    <Option v-for="opt in item.options"
                            :value="opt.value"
                            :key="opt.value">{{opt.label}}</Option>
                  </Select>
                  <div v-else-if="item.type === 'inputBtn'"
                       class='formright'
                       style="display: flex;">
                    <input type="text"
                           class="txt"
                           v-model="it[item.id]"
                           maxlength="30"
                           style="width: 65%" />
                    <div class="btn"
                         @click=";"><span>清除</span></div>
                  </div>
                  <input v-else-if="item.type === 'date'"
                         type="date"
                         v-model="it[item.id]"
                         class="txt" />
                </FormItem>
              </td>
            </tr>
            <tr v-if="!tableList.length">
              <td colspan="10">
                <h4>暂无相关数据</h4>
              </td>
            </tr>
          </table>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => { }
    },
    rules: {
      type: Object,
      default: () => { }
    },
    extra: {
      type: Object,
      default: () => {
        return {}
      }
    },
    disabledListen: {
      type: Function,
      default: () => {
        return Function
      }
    }
  },
  methods: {
    onFormChange () {

    }
  }
}
</script>

<style lang="less" scoped>
.page-content {
  .unify_table_css {
    // overflow-y: auto;
  }
  .unify_table_css table {
    // width: 150%;
  }
}
</style>
