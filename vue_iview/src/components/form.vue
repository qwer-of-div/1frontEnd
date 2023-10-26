<template>
  <div class="page-container">
    <div class="page-content">
      <Form ref="form"
            :model="form"
            :rules="rules"
            :label-position="extra.labelPosition || 'right'"
            :label-width="extra.labelWidth || 100">
        <Row :gutter="extra.gutter || 20">
          <Col v-for="item in formList"
               :span="item.span || 12"
               :key="item.id">
          <FormItem :prop="item.id"
                    :label="item.label"
                    :key="item.id">
            <Input v-if="item.type === 'input'"
                   v-model="form[item.id]"
                   @on-change="onFormChange(item)">
            </Input>
            <Select v-if="item.type === 'select'"
                    v-model="form[item.id]"
                    @on-change="onFormChange(item)">
            </Select>
            <template v-if="item.type === 'slot'">
              <slot :name="item.id">
              </slot>
            </template>
          </FormItem>
          </Col>
        </Row>
      </Form>
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
    onFormChange (item) {
      this.$emit('formChangeListen', item)
    }
  }
}
</script>
