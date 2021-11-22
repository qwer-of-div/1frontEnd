<template>
  <div class="page-container">
    <div class="page-content">
      <h3>vforForm</h3>
      <el-form :inline="true"
               :model="form"
               :rules="init.rules">
        <template v-for="item in init.formList">
          <el-form-item :label="item.label"
                        :prop="item.id"
                        v-if="item.type"
                        :key="item.id">
            <el-input v-if="item.type === 'input'"
                      v-model="form[item.id]"
                      @focus="onFocus(item)"></el-input>
            <el-input type="number"
                      v-else-if="item.type === 'number'"
                      v-model="form[item.id]"></el-input>
            <el-select v-else-if="item.type === 'select'"
                       v-model="form[item.id]">
              <el-option :label="item1.label"
                         :value="item1.id"
                         v-for="item1 in init.options[item.optionId]"
                         :key="item1.id"></el-option>
            </el-select>
            <el-date-picker type="date"
                            v-else-if="item.type === 'date'"
                            v-model="form[item.id]"></el-date-picker>
          </el-form-item>
          <div v-else
               style="display: inline-block"
               :key="item.id">111</div>
        </template>

        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

const formList = [
  { label: '项目编码', type: 'input', id: 'code' },
  { label: '名称', type: 'input', id: 'name' },
  { label: '数量', type: 'number', id: 'count' },
  { label: '出生日期', id: 'birth' },
  { label: '性别', type: 'select', id: 'sex', optionId: 'sex' },
  { label: '性别1', type: 'select', id: 'sex1', optionId: 'sex' },
  { label: '性别2', type: 'select', id: 'sex2', optionId: 'sex' },
  { label: '性别3', type: 'select', id: 'sex3', optionId: 'sex' },
  { label: '出生日期', type: 'date', id: 'birth' },
]

const options = {
  sex: [{ id: 'nan', label: '男' }, { id: 'nv', label: '女' }],
  city: []
}

export default {
  setup (props, context) {
    const page = reactive({
      name: "金毛",
      age: 4,
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    const init = reactive({
      formList,
      options,
      rules: {
        code: [
          { required: true, message: '请输入项目编码', trigger: 'blur' },
        ],
      }
    })
    const onFocus = (item) => {
      console.log(item)
    }
    const onSubmit = () => {
      console.log('methods')
    }
    return {
      init,
      form, // 这样写那么外面就要都基于page来调取, 类型{{form.age}}
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      onFocus,
      onSubmit
    }
  }
}
</script>