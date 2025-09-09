<template>
    <div class="page-contatiner">
        <div class="page-content formlist">
            <Form :model="form" :rules="rules" ref="formSelf">
                <ul>
                    <template v-for="item in formList">
                        <template v-if="!item.hide">
                            <template v-if="item.type === 'slot'">
                                <slot :name="item.id" :item="item"></slot>
                            </template>
                            <li v-else-if="item.type === 'title'" style="width:100%" :key="item.id">
                                <div class="subtop">
                                    <h2 class="maintit">{{item.label}}</h2>
                                </div>
                            </li>
                            <li v-else-if="item.type === 'empty'" style="width:100%;padding:0" :key="item.id"></li>
                            <li v-else-if="item.type === 'dashed'" class="longli" :key="item.id">
                                <div style="width:100%;border-top:1px dashed #ccc;"></div>
                            </li>
                            <li v-else :key="item.id">
                                <label><em v-if="item.required">*</em>{{item.label}}：</label>
                                <FormItem :prop="item.id" :key="item.id" :rules="(typeof rules[item.id] === 'function') ? rules[item.id](item, form) : rules[item.id]">
                                    <input v-if="item.type === 'input'" type="text" class="txt" v-model="form[item.id]" :maxlength="item.maxlength || 1000" :disabled="item.disabled" @input="inputListen($event, item)" @change="formChangeListen(item)">
                                    <div v-else-if="item.type === 'cardCodeInput'" style="width:90%" class="flex">
                                         <template v-if="['10', '11'].includes(form[item.rulePre])">
                                            <input type="text" class="txt flex1" style="margin-right:1%" v-model="form[item.id]" :maxlength="item.maxlength || 1000" :disabled="item.disabled" @input="inputListen($event, item)" @change="formChangeListen(item)">
                                            <button class="sqlbtn btn" @click="btnListen(item)" :disabled="item.btnDisabled" type="button">联网核查</button>
                                        </template>
                                        <input v-else type="text" class="txt flex1" v-model="form[item.id]" :maxlength="item.maxlength || 1000" :disabled="item.disabled" @input="inputListen($event, item)" @change="formChangeListen(item)">
                                    </div>
                                    <div v-else-if="['date', 'date1'].includes(item.type)" style="width:90%" class="flex">
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
                                    <div v-else-if="item.type === 'inputTip'" style="width:90%" class="flex">
                                        <input type="text" class="txt flex1" v-model="form[item.id]" :disabled="item.disabled" :maxlength="item.maxlength || 1000" @change="formChangeListen(item)">
                                        <Tooltip :content="item.tipContent" max-width="300" transfer>
                                            <div class="flex selTip-img-wrap" v-if="item.tipContent">
                                                <img class="selTip-img" src="@/assets/images/company/tip.png" alt="">
                                                <span>{{ item.tipLabel || '说明'}}</span>
                                            </div>
                                        </Tooltip>
                                    </div>
                                    <div class="flex" v-else-if="item.type === 'inputQuery'" style="position:relative;width:90%;">
                                        <input  class="txt flex1" placeholder="请输入搜索内容..." v-model="form[item.id]" @input="inputListen($event, item)" :disabled="item.disabled"/>
                                        <!--模糊查询下拉层-->
                                        <div class="mdatalist_sl" v-show="item.options.length">
                                            <ul>
                                                <li v-for="it in item.options" :key="it.key" @click.stop="inputQueryClick(item, it)">{{it.value}}</li>
                                            </ul>
                                        </div>
                                        <!--模糊查询下拉层-->
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
                                    <div v-else-if="item.type === 'selectTip'" style="width:90%" class="flex">
                                        <select
                                            v-model="form[item.id]"
                                            :disabled="item.disabled"
                                            class="sel flex1"
                                            @change="formChangeListen(item)"
                                            >
                                            <option value="">请选择</option>
                                            <option v-for="it in item.options" :value="it.key" :key="it.key">{{it.value}}</option>
                                        </select>
                                        <Tooltip :content="item.tipContent" max-width="300" transfer>
                                            <div class="flex selTip-img-wrap">
                                                <img class="selTip-img" src="@/assets/images/company/tip.png" alt="">
                                                <span>{{ item.tipLabel || '说明'}}</span>
                                            </div>
                                        </Tooltip>
                                    </div>
                                    <div v-else-if="item.type === 'selectBtn'" style="width:90%" class="flex">
                                        <select
                                            v-model="form[item.id]"
                                            :disabled="item.disabled"
                                            class="sel flex1"
                                            @change="formChangeListen(item)"
                                            >
                                            <option value="">请选择</option>
                                            <option v-for="it in item.options" :value="it.key" :key="it.key">{{it.value}}</option>
                                        </select>
                                        <button class="sqlbtn btn" @click="btnListen(item)" :disabled="item.btnDisabled" type="button">{{item.btnLabel}}</button>
                                    </div>
                                    <div v-else-if="item.type === 'telInput'" style="width:90%" class="flex telInput-warp">
                                        <input type="text" class="txt" v-model="form[item.inputId1]" :disabled="item.disabled" style="width: 25%" :maxlength="item.maxlength1 || 11" @input="inputListen($event, {...item, id: item.inputId1})" @change="formChangeListen({id: item.inputId1})">
                                        <input type="text" class="txt" v-model="form[item.inputId2]" :disabled="item.disabled" style="width: 55%" :maxlength="item.maxlength2 || 11" @input="inputListen($event, {...item, id: item.inputId2})" @change="formChangeListen({id: item.inputId2})">
                                    </div>
                                    <RadioGroup v-else-if="item.type === 'radio'" v-model="form[item.id]" @on-change="formChangeListen(item)">
                                        <Radio v-for="it in item.options" :label="it.value" :key="it.value" :disabled="it.disabled">{{it.label}}</Radio>
                                    </RadioGroup>
                                    <div v-else-if="item.type === 'inputBtn'" class="flex">
                                        <Input v-model="form[item.id]" :disabled="item.disabled" @on-change="formChangeListen(item)"/>
                                        <button class="sqlbtn btn" @click="btnListen(item)" :disabled="item.btnDisabled">{{item.btnLabel}}</button>
                                    </div>
                                    <div v-else-if="item.type === 'inputOCR'" class="flex">
                                        <Input v-model="form[item.id]" :disabled="item.disabled" @on-change="formChangeListen(item)"/>
                                        <img src="@/assets/images/scan.png" alt="" class="inputOCR-img" @click="OCRListen(item)">
                                    </div>
                                    <InputNumber v-model="form[item.id]" v-else-if="item.type === 'number'" @on-change="formChangeListen(item)"/>
                                </FormItem>
                            </li>
                        </template>
                    </template>
                </ul>
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
            default: () => {}
        },
        rules: {
            type: Object,
            default: () => {}
        },
        extra: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    methods: {
        formChangeListen (item) {
            this.$emit('formChangeListen', item)
        },
        btnListen (item, btnType) {
            this.$emit('btnListen', {...item, btnType})
        },
        OCRListen (item) {
            this.$emit('OCRListen', item)
        },
        inputListen (e, item) {
            this.$emit('inputListen', {e, item})
        },
        blurListen (item) {
            this.$emit('blurListen', item)
        },
        inputQueryClick (item, it) {
            this.$emit('inputQueryClick', {item, optionItem: it})
        },
        onDate (item) {
            this.$refs[`${item.id}El`][0].click()
        },
        dateChange (e, item) {
            this.form[item.id] = e.target.value.replace(/-/g, "")
            this.$emit('formChangeListen', item)
        }
    }
}
</script>

<style lang='less' scoped>
.page-content {
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
    .mdatalist_sl{
        position: absolute;
        z-index: 200;
        left: 0;
        bottom: 35px;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        max-height: 202px;
        overflow-y: scroll;
        background: #fff;
    }
    .mdatalist_sl li{
        display: block;
        width: 100%;
        overflow: hidden;
        padding-left:10px;
        border-bottom: 1px solid #ccc
    }
    .date-wrap {
        position: absolute;
        width: 100%;
    }
}
</style>