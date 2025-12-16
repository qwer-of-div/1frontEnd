<template>
    <div class="holdingInfo-self-wrap">
        <template v-for="item in formList">
            <template v-if="!item.hide">
                <li v-if="item.type === 'empty'" style="width:100%;padding:0" :key="item.id"></li>
                <li v-else :key="item.id">
                    <label><em v-if="item.required">*</em>{{item.label.replace('num', index + 1)}}：</label>
                    <FormItem :prop="`${formStr}[${index}].${item.id}`" :rules="(typeof rules[item.id] === 'function') ? rules[item.id](item, form) : rules[item.id]">
                        <input v-if="item.type === 'input'" type="text" class="txt" v-model="form[item.id]" :disabled="item.disabled" :maxlength="item.maxlength || 1000" @change="formChangeListen(item)">
                        <input v-if="item.type === 'input3to2'" type="text" class="txt" v-model="form[item.id]" :maxlength="item.maxlength || 1000" :disabled="item.disabled" @input="inputListen(item)" @change="formChangeListen(item)">
                        <div v-else-if="item.type === 'cardCodeInput'" style="width:90%" class='flex'>
                            <template v-if="['10', '11'].includes(form[item.rulePre])">
                                <input type="text" class="txt flex1" style="margin-right:1%" v-model="form[item.id]" :maxlength="item.maxlength || 1000" :disabled="item.disabled" @input="inputListen(item)" @change="formChangeListen(item)">
                                <button class="sqlbtn btn" @click="btnListen(item)" :disabled="item.btnDisabled" type="button">联网核查</button>
                            </template>
                            <input v-else type="text" class="txt flex1" v-model="form[item.id]" :maxlength="item.maxlength || 1000" :disabled="item.disabled" @input="inputListen(item)" @change="formChangeListen(item)">
                        </div>
                        <div v-else-if="['date', 'date1'].includes(item.type)" style="width:90%" class='flex'>
                            <div class="flex1 pr">
                                <input type="text" class="txt date-wrap" :style="{'background-color':item.disabled?'#f2f2f2':'#fff'}" v-model="form[item.id]" readonly :disabled="item.disabled" @click="onDate(item)">
                                <input
                                    :ref="`${item.id}El`"
                                    type="date"
                                    class="txt"
                                    :min="item.min"
                                    :max="item.max"
                                    v-model="item.dateValue"
                                    @input="dateChange($event, item)"
                                />
                            </div>
                            <button class="sqlbtn btn" @click="btnListen(item, 'long')" :disabled="item.btnDisabled" type="button" style="margin:0 1%">长期</button>
                            <button class="sqlbtn btn" @click="btnListen(item, 'infinite')" :disabled="item.btnDisabled" type="button">无限期</button>
                        </div>
                        <select
                            v-else-if="item.type === 'select'"
                            v-model="form[item.id]"
                            :disabled="item.disabled"
                            class="sel"
                            @change="formChangeListen(item)"
                            >
                            <option value="">请选择</option>
                            <option v-for="it in item.options" :value="it.key" :key="it.key">{{it.value}}</option>
                        </select>
                        <div v-else-if="item.type === 'telInput'" style="width:90%" class="flex telInput-warp">
                            <input type="text" class="txt" v-model="form[item.inputId1]" :disabled="item.disabled" style="width: 25%" :maxlength="item.maxlength1" @input="inputListen({...item, id: item.inputId1})" @change="formChangeListen(item)">
                            <input type="text" class="txt" v-model="form[item.inputId2]" :disabled="item.disabled" style="width: 55%" :maxlength="item.maxlength2" @input="inputListen({...item, id: item.inputId2})" @change="formChangeListen(item)">
                        </div>
                    </FormItem>
                </li>
            </template>
        </template>
    </div>
</template>

<script>
import { DateUtils } from '@/assets/js/formatDate.js'

export default {
    props: {
        formList: {
            type: Array,
            default: () => []
        },
        form: {
            type: Object,
            default: () => {}
        },
        rules: {
            type: Object,
            default: () => {}
        },
        index: {
            tyep: Number,
            default: 0
        },
        formStr: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        }
    },
    methods: {
        formChangeListen (item) {
            this.$emit('formChangeListen', item)
        },
        btnListen (item, btnType) {
            this.$emit('btnListen', {...item, btnType})
        },
        inputListen (item) {
            this.$emit('inputListen', item)
        },
        onDate (item) {
            this.$refs[`${item.id}El`][0].click()
        },
        dateChange (e, item) {
            const value = e.target.value
            this.form[item.id] = value.replace(/-/g, "")
            this.$emit('formChangeListen', item)
            this.$nextTick(() => {
                for(const it of this.formList) {
                    if(item.id === it.id) {
                        e.target.value = value
                        break
                    }
                }
            })
        }
    }
}
</script>

<style lang='less' scoped>
.holdingInfo-self-wrap {
    display:flex;
    flex-wrap:wrap;
    width:100%;
    border-top: 1px dashed #ccc;
    .btn {
        height: 36px;
        padding: 0 15px;
        line-height: 36px;
        border: none;
    }
    .btn[disabled] {
        background-color: #c5c8ce;
    }
    .telInput-warp {
        justify-content: space-between;
    }
    .selTip-img-wrap {
        justify-content: center;
        align-items: center;
    }
    .selTip-img {
        margin: 0 5px;
    }
    .subtop {
        transform: translateX(-20px);
    }
    .inputOCR-img {
        margin-left: 10px;
    }
    .date-wrap {
        position: absolute;
        width: 100%;
    }
}
</style>