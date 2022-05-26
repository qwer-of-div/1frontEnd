
<template v-for="item in projectForms">
          <div v-if="item.show" :class="colClassType[item.type]"
            :style="{height: item.id == 'pocAndOptimizationInfo' ? '95px' : 'auto'}">
            <label :for="item.id">
              <span class="necessaryMark" v-if="item.necessary=='Y'">*
                <span class="necessaryMark" v-if="item.needCheck && projectExist">{{existMessage}}</span>
              </span>
              <span class="necessaryMark" v-if="item.necessary=='X' && EDIT_DATE.params.check">*</span>
              <span class="necessaryMark" v-show="checkOptMessage[item.id]">
                <span class="necessaryMark">{{checkOptMessage[item.id]}}</span>
              </span>
            </label>
            <!-- <hr> -->
            <input :id="item.id" class="form-control" v-model="project[item.id]" onclick=this.select()
              v-if="item.type=='input'" @blur="checkProjectName(item)" />

            <input :id="item.id" placeholder="数字格式" class="form-control" v-model="project[item.id]"
              :disabled="formDisabled[item.id]" v-if="item.type=='inputNumber'" @blur="checkNum" />
            <!-- 行业 === '其他' === 应用场景变输入框 -->
            <input :id="item.id" class="form-control" v-model="project[item.id]"
              v-if="item.type=='select_applicationScenario' && project.industry == '其他'" />

            <select multiple="multiple" class="form-control required relatedReople" :id="item.id"
              v-if="item.type=='select2'"></select>

            <select :id="item.id" class="form-control" v-model="project[item.id]" v-else-if="item.type=='select'">
              <option v-for="opt in options[item.id]" :value="opt.value">{{opt.text}}</option>
            </select>
            <!-- 行业 === 应用场景 -->
            <select :id="item.id" class="form-control" v-model="project[item.id]"
              v-else-if="item.type=='select_applicationScenario' && project.industry != '其他'">
              <option v-for="opt in options[item.id][project.industry]" :value="opt.value">{{opt.text}}
              </option>
            </select>
            <!-- 片区 -->
            <select :id="item.id" class="form-control" v-model="project[item.id]" v-else-if="item.id=='region'"
              @change="setRepOfficeList">
              <option v-for="opt in region" :value="opt.value">{{opt.text}}</option>
            </select>
            </stemplate>