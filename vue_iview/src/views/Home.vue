<template>
  <div class="page-container">
    <div class="page-content">
      <div class="form-wrap">
        <form-Self :formList="formList"
                   :form="form"
                   @formChangeListen="formChangeListen">
          <template #zhuCeSlot>
            <RadioGroup v-model="form.zhuCeSlot"
                        @on-change="formChangeListen({ id: 'zhuCeSlot'})">
              <Radio label="金斑蝶"
                     disabled></Radio>
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </template>
        </form-Self>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import formSelf from '@/components/form.vue'
import { formList } from './staticData'

export default {
  components: {
    formSelf
  },
  data () {
    return {
      formList,
      form: {}
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      this.formList.forEach(item => {
        this.form[item.id] = item.value || ''
      })
      this.form.zhuCeDetail = '111'
    },
    formChangeListen (item) {
      console.log(item, 333, this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  .form-wrap {
    padding: 0 20px;
  }
}
</style>
