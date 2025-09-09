<template>
  <div>
    <div class="subtop">
      <h2 class="maintit">基本信息-企业主及相关人员信息</h2>
    </div>
    <Form v-show="formData.custType === '01'" ref="perTypeMapForm" :model="formData.perTypeMap" :rules="ruleValidatePerTypeMap">
      <div class="formlist">
        <ul>
          <li>
            <label>实际控制人（个人）：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.perTypeMap.actualCtlPersName"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>证件类型：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <select
                        v-model="formData.perTypeMap.certTpMarketing"
                        placeholder="请选择"
                        class="sel"
                        disabled
                >
                  <option
                          v-for="item in mSelectData.CLPM_PERSCUST_CERT_TP_CD"
                          :value="item.key"
                  >{{item.value}}
                  </option>
                </select>
              </div>
            </FormItem>
          </li>
          <li>
            <label>证件号码：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.perTypeMap.certNoMarketing"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>到期日期：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        v-model="formData.perTypeMap.dueDateMarketing"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>性别：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <select
                        v-model="formData.perTypeMap.sex"
                        placeholder="请选择"
                        class="sel"
                >
                  <option value='1'>男</option>
                  <option value='2'>女</option>
                </select>
              </div>
            </FormItem>
          </li>
          <li>
            <label>年龄：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        v-model="formData.perTypeMap.age"
                        maxlength="100"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>学历：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <select
                        v-model="formData.perTypeMap.eduBgdCode"
                        placeholder="请选择"
                        class="sel"
                >
                  <option
                          v-for="item in mSelectData.CLPM_EDU_BGD_CODE"
                          :value="item.key"
                  >{{item.value}}
                  </option>
                </select>
              </div>
            </FormItem>
          </li>
          <li>
            <label>持股比例（%）：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[^\d\.]/g,'')"
                        v-model="formData.perTypeMap.shrHoldRatio"
                        maxlength="50"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>从事本行业年限：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        v-model="formData.perTypeMap.engageTindsYearNum"
                        maxlength="100"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>在本企业担任职务：</label>
            <FormItem prop="majorBusiOprYearNumCode">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        v-model="formData.perTypeMap.enterCorpOffc"
                        maxlength="500"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>联系电话：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[^\d\.]/g,'')"
                        v-model="formData.perTypeMap.contTel"
                        maxlength="11"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>家庭住址：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.perTypeMap.familyAddr"
                        maxlength="500"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>婚姻状况：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <select
                        v-model="formData.perTypeMap.marrgSituCode"
                        placeholder="请选择"
                        class="sel"
                >
                  <option
                          v-for="item in mSelectData.MARRG_SITU_CODE"
                          :value="item.key"
                  >{{item.value}}
                  </option>
                </select>
              </div>
            </FormItem>
          </li>
          <li v-if="formData.perTypeMap.marrgSituCode === '1'">
            <label>配偶姓名：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        v-model="formData.perTypeMap.spouseName"
                        maxlength="500"
                />
              </div>
            </FormItem>
          </li>
          <li v-if="formData.perTypeMap.marrgSituCode === '1'">
            <label>配偶职业：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.perTypeMap.spouseOccup"
                        maxlength="500"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>主要工作履历：</label>
            <FormItem prop="mainWorkresm">
              <div class="formright">
                <textarea class="areatxt" v-model="formData.perTypeMap.mainWorkresm"></textarea>
              </div>
            </FormItem>
          </li>
        </ul>
      </div>
    </Form>
    <Form v-show="formData.custType === '02'" ref="lglerTypeMapForm" :model="formData.lglerTypeMap" :rules="ruleValidateLglerTypeMap">
      <div class="formlist">
        <ul>
          <li>
            <label>实际控制人(法人)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.actualCtlPersName"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>统一社会信用代码：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.unifiedSocCrCodeMarketing"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>企业规模(工信部标准)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <select
                        v-model="formData.lglerTypeMap.corpSizeCodeMarketing"
                        placeholder="请选择"
                        class="sel"
                >
                  <option
                          v-for="item in mSelectData.CLPM_CORP_SIZE_CODE"
                          :value="item.key"
                  >{{item.value}}
                  </option>
                </select>
              </div>
            </FormItem>
          </li>
          <li>
            <label>注册资本(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.regCapitalQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label> 地址(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.addrQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>实收资本(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.actRecvCapitalQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>注册资本：</label>
            <FormItem prop="regCapital">
              <div class="formright">
                <input
                v-money="formData.lglerTypeMap.regCapital"
                        type="text"
                        class="txt"
                        v-model="formData.lglerTypeMap.regCapital"
                />
                <label>万元</label>
              </div>
            </FormItem>
          </li>
          <li>
            <label>地址：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.addr"
                        maxlength="500"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>实收资本：</label>
            <FormItem prop="actRecvCapital">
              <div class="formright">
                <input
                v-money="formData.lglerTypeMap.actRecvCapital"
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[^\d\.]/g,'')"
                        v-model="formData.lglerTypeMap.actRecvCapital"
                />
                <label>万元</label>
              </div>
            </FormItem>
          </li>
          <li>
            <label>所属行业(启信宝)：</label>
            <FormItem prop="majorBusiOprYearNumCode">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.belongIndsCodeQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>员工人数(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[^\d\.]/g,'')"
                        v-model="formData.lglerTypeMap.empPersNumQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>法定代表人(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.lgrpsQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>所属行业：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright white" @click="showSwitch1(true)">
                <input
                        type="text"
                        class="txt"
                        v-model="formData.lglerTypeMap.belongIndsCodeTitle"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>员工人数：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        v-model="formData.lglerTypeMap.empPersNum"
                        maxlength="20"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>法定代表人：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.lgrps"
                        maxlength="500"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>经营期限起始日期(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        v-model="formData.lglerTypeMap.oprTermBgnDtQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>经营期限终止日期(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        v-model="formData.lglerTypeMap.oprTermEndDtQxb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>经营范围(启信宝)：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.oprmngScopeXqb"
                        disabled
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>经营期限起始日期：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="date"
                        class="txt"
                        v-model="formData.lglerTypeMap.oprTermBgnDt"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>经营期限终止日期：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="date"
                        class="txt"
                        v-model="formData.lglerTypeMap.oprTermEndDt"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>经营范围：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <input
                        type="text"
                        class="txt"
                        oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                        v-model="formData.lglerTypeMap.oprmngScope"
                        maxlength="2000"
                />
              </div>
            </FormItem>
          </li>
          <li>
            <label>工商状态：</label>
            <FormItem prop="majorBusiOprmngAddr">
              <div class="formright">
                <select
                        v-model="formData.lglerTypeMap.icbStaQxb"
                        placeholder="请选择"
                        class="sel"
                >
                  <option
                          v-for="item in mSelectData.ICB_STA_QXB"
                          :value="item.key"
                  >{{item.value}}
                  </option>
                </select>
              </div>
            </FormItem>
          </li>
        </ul>
      </div>
    </Form>
    <div v-if="isMergeDue" style="transform:translateY(-18px)">
      <form-self :formList="formList" :form="form" :rules="rules" @formChangeListen="formChangeListen" @btnListen="btnListen" @inputListen="inputListen" ref="formWrap">
          <template #holdingInfos>
              <template v-for="(item, index) in form.holdingInfos">
                  <holdingInfo-self :formList="holdingFormListFilter(item)" :form="item" :index="index" :rules="rules" formStr="holdingInfos" @formChangeListen="holdingInfoFormChange($event, index)" @inputListen="holdingInfoInputListen($event, index)" @btnListen="holdingInfoBtnListen($event, index)"></holdingInfo-self>
              </template>
          </template> 
          <template #personInfoArray>
              <template v-for="(item, index) in form.personInfoArray">
                  <holdingInfo-self :formList="personFormListFilter(item)" :form="item" :index="index" :rules="rules" formStr="personInfoArray" @formChangeListen="personInfoFormChange($event, index)" @inputListen="personInfoInputListen($event, index)" @btnListen="personInfoBtnListen($event, index)"></holdingInfo-self>
              </template>
          </template>
          <template #earningsInfoArray>
              <template v-for="(item, index) in form.earningsInfoArray">
                  <holdingInfo-self :formList="earningsFormListFilter(item)" :form="item" :index="index" :rules="rules" formStr="earningsInfoArray" @formChangeListen="earningsInfoFormChange($event, index)" @inputListen="earningsInfoInputListen($event, index)" @btnListen="earningsInfoBtnListen($event, index)"></holdingInfo-self>
              </template>
          </template>
      </form-self>
    </div>
    <div class="btngroup" v-show="formData.custType === '01'">
      <a @click="syncEnterpreneurInfo()" class="sqlbtn">同步</a>
    </div>
    <div class="btngroup" v-show="formData.custType === '02'">
      <a @click="syncEnterpreneurInfo2()" class="sqlbtn">同步</a>
    </div>
    <div class="subtop">
      <h2 class="maintit">基本信息-其他相关人员</h2>
      <a @click="addItem(1)" class="flowbtn">添加</a>
    </div>
    <div class="tablelist unify_table_css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>人员类型</th>
          <th>姓名</th>
          <th>证件类型</th>
          <th>证件号码</th>
          <th>到期日期</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in formData.corpBaseArray">
          <td>
            <select
                    v-model="item.personType"
                    class="sel"
            >
              <option
                      v-for="(item1,index) in mSelectData.PERSON_TYPE"
                      :key="index"
                      :value="item1.key"
              >{{item1.value}}
              </option>
            </select>
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.name"
                    class="txt"
                    maxlength="500"
            />
          </td>
          <td>
            <select
                    v-model="item.certTp"
                    class="sel"
            >
              <option
                      v-for="(item1,index) in mSelectData.CLPM_PERSCUST_CERT_TP_CD"
                      :key="index"
                      :value="item1.key"
              >{{item1.value}}
              </option>
            </select>
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.certNo"
                    class="txt"
                    maxlength="500"
            />
          </td>
          <td>
            <input
                    type="date"
                    v-model="item.dueDate"
                    class="txt"
            />
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.addr"
                    class="txt"
                    maxlength="500"
            />
          </td>
          <td>
            <a @click="delItem(index,1)">删除</a>
          </td>
        </tr>
        <tr v-if="formData.corpBaseArray.length===0">
          <td colspan="7">
            <h4>暂无相关数据</h4>
          </td>
        </tr>
      </table>
    </div>
    <div class="btngroup">
      <a @click="syncList1()" class="sqlbtn">同步</a>
    </div>
    <div class="subtop">
      <h2 class="maintit">基本信息-高管信息</h2>
      <a @click="addItem(2)" class="flowbtn">添加</a>
    </div>
    <div class="tablelist unify_table_css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>职务</th>
          <th>姓名</th>
          <th>现职时间</th>
          <th>与实际控制人关系</th>
          <th>从事本行业年限</th>
          <th>联系电话</th>
          <th>学历</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in formData.corpPostArray">
          <td>
            <select
                    v-model="item.postn"
                    class="sel"
            >
              <option
                      v-for="(item1,index) in mSelectData.POSTN"
                      :key="index"
                      :value="item1.key"
              >{{item1.value}}
              </option>
            </select>
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.name"
                    class="txt"
                    maxlength="500"
            />
          </td>
          <td>
            <input
                    type="date"
                    v-model="item.prsWorkTime"
                    class="txt"
            />
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.withActualCtlPersRelat"
                    class="txt"
                    maxlength="500"
            />
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.engageTindsYearNum"
                    class="txt"
                    maxlength="100"
            />
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.contTel"
                    class="txt"
                    maxlength="100"
            />
          </td>
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.eduBgd"
                    class="txt"
                    maxlength="50"
            />
          </td>
          <td>
            <a @click="delItem(index,2)">删除</a>
          </td>
        </tr>
        <tr v-if="formData.corpPostArray.length===0">
          <td colspan="7">
            <h4>暂无相关数据</h4>
          </td>
        </tr>
      </table>
    </div>
    <div class="btngroup">
      <a @click="syncList2()" class="sqlbtn">同步</a>
    </div>
    <div v-if="rptfSuitType === '01'" class="subtop">
      <h2 class="maintit">基本信息-主要关联企业</h2>
      <a @click="addItem(3)" class="flowbtn">添加</a>
    </div>
    <div v-if="rptfSuitType === '01'" class="tablelist unify_table_css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>主要关联企业</th>
          <th>证件类型</th>
          <th>工商状态</th>
          <th>统一社会信用代码</th>
          <th>企业规模（工信部标准）</th>
          <th>与借款企业关联关系</th>
          <th>详细信息</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in formData.affiliatedCompanyArray">
          <td>
            <input
                    type="text"
                    oninput="value=value.replace(/[`~^\\^'\\\\\\/~`<>]/g,'')"
                    v-model="item.mainRelCorpName"
                    class="txt"
                    maxlength="500"
            />
          </td>
          <td>
            <select
                    v-model="item.documentType"
                    class="sel"
            >
              <option
                      v-for="(item1,index) in mSelectData.CLPM_TOCORP_CUST_CERT_TP_CD"
                      :key="index"
                      :value="item1.key"
              >{{item1.value}}
              </option>
            </select>
          </td>
          <td>
            <select
                    v-model="item.icbSta"
                    class="sel"
            >
              <option
                      v-for="(item1,index) in mSelectData.ICB_STA_QXB"
                      :key="index"
                      :value="item1.key"
              >{{item1.value}}
              </option>
            </select>
          </td>
          <td>
            <input
                    type="text"
                    v-model="item.unifiedSocCrCode"
                    class="txt"
                    maxlength="500"
            />
          </td>
          <td>
            <select
                    v-model="item.corpSizeCode"
                    class="sel"
            >
              <option
                      v-for="(item1,index) in mSelectData.CLPM_CORP_SIZE_CODE"
                      :key="index"
                      :value="item1.key"
              >{{item1.value}}
              </option>
            </select>
          </td>
          <td>
            <select
                    v-model="item.withLendCorpRelRelatCode"
                    class="sel"
            >
              <option
                      v-for="(item1,index) in withLendCorpRelRelatCodeList"
                      :key="index"
                      :value="item1.key"
              >{{item1.value}}
              </option>
            </select>
          </td>
          <td>
            <a @click="affiliatedCompanyArrayEdit(item,index)">编辑</a>
          </td>
          <td>
            <a @click="delItem(index,3)">删除</a>
          </td>
        </tr>
        <tr v-if="formData.affiliatedCompanyArray.length===0">
          <td colspan="7">
            <h4>暂无相关数据</h4>
          </td>
        </tr>
      </table>
    </div>
    <div class="formlist">
      <ul>
        <!--        <li class="longli" v-if="formData.custType === '01'">-->
        <!--          <label>主要工作履历：</label>-->
        <!--          <div class="formright">-->
        <!--            <textarea class="areatxt" v-model="formData.mainWorkresm"></textarea>-->
        <!--          </div>-->
        <!--        </li>-->
        <li class="longli" v-if="formData.custType === '02'">
          <label>在我行授信情况：</label>
          <div class="formright">
            <textarea class="areatxt" v-model="formData.lglerTypeMap.remark"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="btngroup">
      <a @click="onSave('tempSave')" class="sqlbtn" v-if="toPublicInfo.busiStatus === '10'">暂存</a>
      <a @click="onSave('save')" class="sqlbtn" v-else>保存</a>
    </div>
    <div class="fullbg" style="display: block;" v-if="showFlag1"></div>
    <div class="dialog" id="dialog1" style="display: block;" v-if="showFlag1">
      <div class="subtop">
        <h2 class="maintit">{{"所属行业"}}</h2>
        <a @click="showSwitch1(false)" class="close" title="关闭"></a>
      </div>
      <div class="treeList">
        <Tree 
          ref="tree1" 
          :data="industryData" 
          :load-data="loadDataList" 
          @on-select-change="selectedChang"
        ></Tree>
      </div>
    </div>
    <EnterpreneurInfoModal  :infoModal="infoModal" :ItemData="infoModalItem" :ItemIndex="infoModalIndex" @getDataBack="infoModalBack" @close="infoModalClose" />
  </div>
</template>

<script>
    import {IndustryData} from "./IndustryData"
    import {Toast} from "@/assets/js/Utils"
    import {PostUrl} from '@/assets/js/postUrl'
    import NativeLoanDB from '@/assets/bridge/NativeLoanDB'
    import {getDisc} from '@/assets/js/dictionarie.js'
    import NativeMarketingDB from '@/assets/bridge/NativeMarketingDB'
    import { mapState } from "vuex";

    import { Utils, CheckUtils } from '@/assets/js/common.js'
    import formSelf from '../components/form'
    import holdingInfoSelf from './holdingInfo'
    import EnterpreneurInfoModal from './EnterpreneurInfoModal'
    import { enterpreneurFormList, holdingFormList, personFormList, earningsFormList,
             holdingInfo, personInfo , earningsInfo, dateObj } from '../staticData'
    import { telValidator, nameValidator, cardTypeValidator, startDateValidator,
             endDateValidator, percentValidator, nationValidator, emptyValidator } from '../validator'
    import { oprtorInfoTpCd as oprtorInfoTpCdOption,
             rnboerInfoMtpxTpCd as rnboerInfoMtpxTpCdOption, lglerCertType as lglerCertTypeOption, selSerChanlNo as selSerChanlNoOption } from '@/assets/dictionary'

    // 管理人
   const lgler = ['lglPersName', 'lglerCertType', 'lglPersCertNo', 'lgrpsCertEffDt',
                  'lglerCertDueDate', 'dmstTelAreaNo', 'lglerContTel', 'lglerSpecificAddr',
                  'lglerNationCode', 'lglerProvName', 'lglerCityName', 'lglerAreaCountyAddr']
    // 单位授权人
    const ifAuthorizedPersonList = ['agentPersName', 'agentPersCertType', 'agentPersCertNo', 'authorCertEffDt',
                                    'agtPersCertDueDate', 'thagentPersContTel', 'agtPersTelAreaNo', 'agentPersContTel', 'agentPersSpecificAddr',
                                    'agentPersNationCode', 'agentPersProvName', 'agentPersCityName', 'agentPersAreaCountyAddr']
    // 财务负责人                         
    const finoffWLgrpsFitFlagList = ['finRepPersName', 'finRepPersCertType', 'finRepPersCertNo', 'finoffCertEffDt',
                                      'finRepPersCertDueDate', 'thfinRepPersContTel', 'finRepPersTelAreaNo', 'finRepPersContTel', 'finRepPersSpecificAddr',
                                      'finRepPersNationCode', 'finRepPersProvName', 'finRepPersCityName', 'finRepPersAreaCountyName']
    // 经办人
    const agentFlagList = ['oprtorName', 'oprtorCertType', 'oprtorCertNo', 'oprtorCertEffDt',
                          'oprtorCertDueDate', 'oprtorTelAreaNo', 'thoprtorMobile', 'oprtorMobile', 'oprtorContAddr',
                          'oprtorNationCode', 'oprtorProvCd', 'oprtorCityCd', 'oprtorAreaCountyName']

    export default {
        components: {
          formSelf,
          holdingInfoSelf,
          EnterpreneurInfoModal
        },
        data() {
          var _this = this;
            return {
                infoModal: false,
                infoModalItem: {},
                infoModalIndex:0,
                showFlag1: false,
                industryData:[],
                mSelectData: {},
                formData: {
                    corpBaseArray: [],	//其他相关人员（集合）					备注list
                    corpPostArray: [],  //	高管信息(集合)					备注list
                    affiliatedCompanyArray: [],  //	主要关联企业(集合)					备注list
                    custType: '',
                    // 实际控制人(个人)custType == '01'
                    perTypeMap: {
                        actualCtlPersName: '', //		实际控制人(个人)
                        certTpMarketing: '', //		证件类型
                        certNoMarketing: '', //		证件号码	60	string
                        dueDateMarketing: '', //		到期日期	10	string
                        sex: '', //		性别
                        age: '', //		年龄	10	Number
                        eduBgdCode: '', //		学历	200	string
                        shrHoldRatio: '', //		持股比例(%)	8,4	Number
                        engageTindsYearNum: '', //		从事本行业年限	10	Number
                        enterCorpOffc: '', //		在本企业担任职务	200	string
                        contTel: '', //		联系电话	60	string
                        familyAddr: '', //		家庭住址	200	string
                        marrgSituCode: '', //		婚姻状况	2	string			{id "0", name "未婚"}, {id "1", name "已婚"},{id "2", name "离异"},{id "3", name "其他"}
                        spouseName: '', //		配偶姓名	200	string			marrgSituCode == '1'展示
                        spouseOccup: '', //		配偶职业	200	string			marrgSituCode == '1'展示
                        mainWorkresm: '', //		主要工作履历	text
                    },
                    // 实际控制人(法人)  custType == '02'
                    lglerTypeMap: {
                        actualCtlPersName: '',	//实际控制人(法人)
                        unifiedSocCrCodeMarketing: '',	//统一社会信用代码
                        corpSizeCodeMarketing: '', //	企业规模(工信部标准)
                        regCapitalQxb: '', //		注册资本(启信宝)	22，2	Number		M
                        addrQxb: '', //		 地址(启信宝)	200	string		O
                        actRecvCapitalQxb: '', //		实收资本(启信宝)	22，2	Number		O
                        regCapital: '', //		注册资本	22，2	Number		O
                        addr: '', //		地址	2	string
                        actRecvCapital: '', //		实收资本	22，2	Number
                        belongIndsCodeQxb: '', //		所属行业(启信宝)	200	string
                        empPersNumQxb: '', //		员工人数(启信宝)	10	Number
                        lgrpsQxb: '', //		法定代表人(启信宝)	200	string
                        belongIndsCode: '', //		所属行业	200	string			码值 参考公共码值
                        empPersNum: '', //		员工人数	10	Number
                        lgrps: '', //		法定代表人	200	string
                        oprTermBgnDtQxb: '', //		经营期限起始日期(启信宝)	10	string
                        oprTermEndDtQxb: '', //		经营期限终止日期(启信宝)	10	string
                        oprmngScopeXqb: '', //		经营范围(启信宝)	500	string
                        oprTermBgnDt: '', //		经营期限起始日期	10	string
                        oprTermEndDt: '', //		经营期限终止日期	10	string
                        oprmngScope: '', //		经营范围	500	string
                        icbStaQxb: '', //		工商状态
                        remark: '',	//在我行授信情况
                    },
                },
                ruleValidate: {},
                ruleValidatePerTypeMap:{
                  mainWorkresm:this.$store.state.RULES_NOT_EMPTY,
                },
                ruleValidateLglerTypeMap:{
                  regCapital:[//详细说明相关情况
                    {
                      required: false,
                      validator(rule, value, callback) {
                        let reg = /^\d{1,20}(\.\d{1,2})?$/
                        if (!Utils.checkNull(_this.formData.lglerTypeMap.regCapital)) {
                          if(!reg.test(_this.formData.lglerTypeMap.regCapital)){
                            callback(new Error('输入数值小数点前最多20位，小数点后最多2位'))
                          }
                          else{
                            callback()
                          }
                        }
                        else{
                          callback()
                        }
                      }
                    }
                  ],
                  actRecvCapital:[//详细说明相关情况
                    {
                      required: false,
                      validator(rule, value, callback) {
                        let reg = /^\d{1,20}(\.\d{1,2})?$/
                        if (!Utils.checkNull(_this.formData.lglerTypeMap.actRecvCapital)) {
                          if(!reg.test(_this.formData.lglerTypeMap.actRecvCapital)){
                            callback(new Error('输入数值小数点前最多20位，小数点后最多2位'))
                          }
                          else{
                            callback()
                          }
                        }
                        else{
                          callback()
                        }
                      }
                    }
                  ],
                },
                formList: [],
                formListCopy: this.$clone(enterpreneurFormList),
                form: {},
                rules: {},
                holdingFormList: this.$clone(holdingFormList),
                personFormList: this.$clone(personFormList),
                earningsFormList: this.$clone(earningsFormList),
                mSelectData: {},
                withLendCorpRelRelatCodeList:[
                  {
                    key:"0",
                    value:"投资关系（母子公司）"
                  },
                  {
                    key:"1",
                    value:"实际控制人或配偶控股"
                  },
                  {
                    key:"2",
                    value:"其他关联关系"
                  },
                ]
            }
        },
        computed: {
          ...mapState(["rptfSuitType"]),
          formComputed () {
            return this.$clone(this.form)
          },
          toPublicInfo () {
              return this.$clone(this.$store.state.company.toPublicInfo)
          },
          isMergeDue(){
            return this.$store.state.company.isMergeDue
          }
        },
        watch: {
          // 处理结构
          formComputed: {
              handler(newVal, oldVal) {
                if(!this.isMergeDue) return;
                this.formListListen()
              },
          },
          toPublicInfo: {
            handler(newVal, oldVal) {
                if(!this.isMergeDue) return;
                this.formList.forEach( item => {
                    const value = (item.value === 0 || item.value) ? item.value : ''
                    this.form[item.id] = newVal[item.id] ? newVal[item.id] : value
                    if(item.type === 'telInput') {
                      const inputId1 = newVal[item.inputId1] ? newVal[item.inputId1] : ''
                      const inputId2 = newVal[item.inputId2] ? newVal[item.inputId2] : ''
                      this.$set(this.form, [item.inputId1], inputId1)
                      this.$set(this.form, [item.inputId2], inputId2)
                    }
                })
              
                if(this.form.bfcyWRelNatuerFitFlag === '1') { // 67
                  this.form.earningsInfoArray = []
                }
            },
          }
        },
        mounted() {
            this.industryData = IndustryData
            this.initDBData()
        },
        methods: {
            initDBData() {
                let str = ['CLPM_CORP_SIZE_CODE', 'CLPM_UNIT_BELONG_INDS_TYPE', 'CLPM_PERSCUST_CERT_TP_CD',
                    'CLPM_SEX_CODE', 'CLPM_PERSCUST_CERT_TP_CD', 'CLPM_EDU_BGD_CODE','CLPM_TOCORP_CUST_CERT_TP_CD']
                let str2 = ['ICB_STA_QXB','MARRG_SITU_CODE','PERSON_TYPE','POSTN']
                NativeLoanDB.getDics(str).then((value) => {
                  this.mSelectData = {...value,...getDisc(str2)};
                  for(let key in this.mSelectData){
                    this.mSelectData[key].unshift({
                      key:"",
                      value:"请选择",
                    })
                  }
                })

                NativeMarketingDB.getDics(['NATIONALITY', 'PROVINCE', 'CITY', 'AREA_COUNTY']).then(map => {
                  this.selectData = map
                  this.handleInitData()
                })
            },
            initData() {
                let param = {
                    custNo: this.$store.state.peanuts.custNo
                    // custNo: '10010270706405'
                }
                this._$post(PostUrl.copownerRelatePersonBasInfo, param).then(successResponce => {
                  console.log(successResponce,'successResponce')
                    //{"msg":"交易成功","newCoreFlag":"","code":"0000","seqNo":"","reserve4":"","dataMap":{"corpPostArray":[{"postn":"2","prsWorkTime":"2034-09-27","withActualCtlPersRelat":"234","engageTindsYearNum":"223","name":"234","contTel":"234234"}],
                    // "corpBaseArray":[{"certNo":"234","certTp":"22","dueDate":"2034-09-11","name":"234","addr":"234","personType":"2"},{"certNo":"234","certTp":"20","dueDate":"2034-09-05","name":"123","addr":"234","personType":"0"}]},"custType":"","showType":"0","reserve3":"","globalBusiTrackNo":""}
                    // alert('企业主'+JSON.stringify(successResponce))
                    if (successResponce.code === '0000') {
                        if(successResponce.dataMap.corpPostArray){
                            this.formData.corpPostArray = successResponce.dataMap.corpPostArray
                        }
                        if(successResponce.dataMap.corpBaseArray){
                            this.formData.corpBaseArray = successResponce.dataMap.corpBaseArray
                        }
                        if(successResponce.dataMap.custType){
                            this.formData.custType = successResponce.dataMap.custType
                        }
                        if (successResponce.dataMap.lglerTypeMap) {
                            this.formData.lglerTypeMap = successResponce.dataMap.lglerTypeMap
                            this.recursion(this.formData.lglerTypeMap.belongIndsCode,this.industryData)
                        }
                        if (successResponce.dataMap.perTypeMap) {
                            this.formData.perTypeMap = successResponce.dataMap.perTypeMap
                        }
                        if (successResponce.dataMap.affiliatedCompanyArray) {
                            this.formData.affiliatedCompanyArray = successResponce.dataMap.affiliatedCompanyArray
                        }
                        if(!this.formData.custType){
                            this._$showInfo('未查询到实际控制人信息，请至CRM系统维护该客户实际控制人')
                        }
                        } else {
                            this._$showInfo(successResponce.msg) // undefined
                        }
                    }).catch(failResponce => {
                        this._$showInfo(failResponce)
                    })
            },
            addItem(part) {
                if (part === 1) {
                    var item = {
                        // payVistPersName: '', //	走访人员姓名
                        // createTellerNo: '', //	创建柜员号
                        // payVistDate: Utils.getSysDate(), //		走访日期
                        // accMngCustMgrBo: '', //	创建机构号
                        // createTime: Utils.getNetDate(), //		创建时间
                        // createInstNo: Session.getDataByKey('tranBranch'), //		创建机构号
                        // cruserId: this.formData.cruserId, //	信用户ID
                        // sysUniqueNo: Utils.getRandom32() //	系统唯一编号
                    }
                    this.formData.corpBaseArray.push(item)
                }
                if (part === 2) {
                    var item = {}
                    this.formData.corpPostArray.push(item)
                }
                if(part === 3){
                   this.formData.affiliatedCompanyArray.push({
                     mainRelCorpName:"",
                     documentType:"",
                     icbSta:"",
                     unifiedSocCrCode:"",
                     corpSizeCode:"",
                     withLendCorpRelRelatCode:"",
                     mainRelCorpName:"",
                     regCapital:"",
                     addr:"",
                     actRecvCapital:"",
                     custBelongInds:"",
                     empPersNum:"",
                     legalRepresen:"",
                     oprTermBgnDt:"",
                     oprTermEndDt:"",
                     oprmngScope:"",
                     negativeInformation:"",
                     fieldInvestigation:"",
                     operationalRelevance:"",
                     buildReason:"",
                     cfmFlag:"",
                   })
                }
            },
            delItem(index, part) {
                if (part === 1 && this.formData.corpBaseArray.length > 0) {
                    this.$Modal.confirm({
                        title: '请确认',
                        content: '<p>是否确定删除信息？</p>',
                        onOk: () => {
                            this.formData.corpBaseArray.splice(index, 1)
                            this.$forceUpdate()
                        }
                    })
                }
                if (part === 2 && this.formData.corpPostArray.length > 0) {
                    this.$Modal.confirm({
                        title: '请确认',
                        content: '<p>是否确定删除信息？</p>',
                        onOk: () => {
                            this.formData.corpPostArray.splice(index, 1)
                            this.$forceUpdate()
                        }
                    })
                }
                if (part === 3 && this.formData.affiliatedCompanyArray.length > 0) {
                    this.$Modal.confirm({
                        title: '请确认',
                        content: '<p>是否确定删除信息？</p>',
                        onOk: () => {
                            this.formData.affiliatedCompanyArray.splice(index, 1)
                            this.$forceUpdate()
                        }
                    })
                }
            },
            syncEnterpreneurInfo(){  //同步企业主及相关人员信息ecustType === '01'
              let param = {
                CUSTOMERNO: this.$store.state.peanuts.custNo
                // CUSTOMERNO: '10010286586385'
              }
              this._$post(PostUrl.t04000143, param).then(res => {
                console.log(res,'res')
                if(res.code === '0000'){
                  if(Utils.checkNull(res.perTypeMap)){
                    this._$showInfo("同步客户信息失败，系统未返回数据")
                    return
                  }
                  this.formData.perTypeMap.actualCtlPersName = res.perTypeMap.actualCtlPersName
                  this.formData.perTypeMap.certTpMarketing = res.perTypeMap.certTpMarketing
                  this.formData.perTypeMap.certNoMarketing = res.perTypeMap.unifiedSocCrCodeMarketing
                  this.formData.perTypeMap.dueDateMarketing = res.perTypeMap.dueDateMarketing
                  Toast.makeTextShort('同步成功')
                }else{
                  this._$showInfo(res.msg)
                }
              }).catch(error => {
                this._$showInfo(error)
              })
            },
            syncEnterpreneurInfo2() {  //同步企业主及相关人员信息ecustType === '02'
              let param = {
                CUSTOMERNO: this.$store.state.peanuts.custNo
                // CUSTOMERNO: '10010286586385'
              }
              this._$post(PostUrl.t04000143, param).then(res => {
                console.log(res,'res')
                if(res.code === '0000'){
                  if(Utils.checkNull(res.perTypeMap)){
                    this._$showInfo("同步客户信息失败，系统未返回数据")
                    return
                  }
                  this.formData.lglerTypeMap.actualCtlPersName = res.perTypeMap.actualCtlPersName          // 实际控制人（法人） 
                  this.formData.lglerTypeMap.unifiedSocCrCodeMarketing = res.perTypeMap.unifiedSocCrCodeMarketing  // 统一社会信用代码 C100
                  let param2 = {
                    creditNo: this.formData.lglerTypeMap.unifiedSocCrCodeMarketing
                  }
                  this._$post(PostUrl.t0400065, param2).then(res => {
                    if(Utils.checkNull(res.result) || res.result.length === 0){
                      this._$showInfo("同步客户信息失败，系统未返回数据")
                      return
                    }
                    console.log(res,'t0400065')
                    let param3 = {
                      eid: res.result[0].eid,
                      // eid: '000010e3-54a8-4ad6-895f-0245e8b2d400',
                      tableName: '01'
                    }
                    let param4 = {
                      eid: res.result[0].eid,
                      // eid: '002751fe-fd0e-4b76-a5d4-ba5aa7adb000|7758113',
                      tableName: '08'
                    }
                    let param5 = {
                      eid: res.result[0].eid,
                      // eid: '18a42f60-9df1-4744-ba05-4ab2b8585f00|4968'
                    }
                    let 
                      temp3 = false,
                      temp4 = false
                    this._$post(PostUrl.t0400066, param3).then(res2 => {
                      if (res2.code === '1') {
                        this.formData.lglerTypeMap.regCapitalQxb = res2.result[0].regist_capi_new  // 注册资本（启信宝）
                        this.formData.lglerTypeMap.regCapitalQxb = res2.result[0].actual_capi      // 实收资本（启信宝）
                        this.formData.lglerTypeMap.empPersNumQxb = res2.result[0].collegues_num  // 员工人数（启信宝）
                        this.formData.lglerTypeMap.lgrpsQxb = res2.result[0].oper_name  // 法定代表人（启信宝）
                        this.formData.lglerTypeMap.oprmngScopeXqb = res2.result[0].scope  // 经营范围（启信宝）
                        this.formData.lglerTypeMap.oprTermBgnDtQxb = res2.result[0].term_start  // 经营期限起始日期（启信宝）
                        this.formData.lglerTypeMap.oprTermEndDtQxb = res2.result[0].term_end  // 经营期限终止日期（启信宝）
                        temp3 = true
                      }else{
                        this._$showInfo(res2.msg)
                      }
                    }).catch(error => { this._$showInfo(error) })
                    this._$post(PostUrl.t0400066, param4).then(res2 => {
                      if (res2.code === '1') {
                        this.formData.lglerTypeMap.addrQxb = res2.result[0].address   // 地址（启信宝）
                        temp4 = true
                      }else{
                        this._$showInfo(res2.msg)
                      }
                    }).catch(error => { this._$showInfo(error) })
                    this._$post(PostUrl.t0400154, param5).then(res2 => {
                      if(res2.code === '0000'){
                        this.formData.lglerTypeMap.belongIndsCodeQxb = res2.industryName //所属行业
                        if (temp3 && temp4) {
                          Toast.makeTextShort('同步成功')
                        }
                      }
                    }).catch(error => { this._$showInfo(error) })
                  }).catch(error => {
                    this._$showInfo(error)
                  })
                }else{
                  this._$showInfo(res.msg)
                }
              }).catch(error => {
                this._$showInfo(error)
              }) 
            },
            syncList1(){   // 同步其他相关人员列表
              let param = {
                dataType: '2', //custInfoList:1 , personInfoList:2 , zhxList:3
                FUN_CODE: "1",
                FIRST_NUM: "1",
                CUSTOMERNO: this.$store.state.peanuts.custNo
                // CUSTOMERNO: "10010282306385"
              }
              this._$post(PostUrl.t04000144,param).then(res => {
                if(res.code === '0000'){
                  if(res.personInfoList.length>0){
                    this.formData.corpBaseArray = res.personInfoList
                    Toast.makeTextShort('同步成功')
                  }else{
                    Toast.makeTextShort('返回数据为空')
                  }
                }else{
                  this._$showInfo(res.msg)
                }
              })
            },
            syncList2(){   // 高管信息列表
              let param = {
                CUSTOMERNO: this.$store.state.peanuts.custNo
                // CUSTOMERNO: '10010286586385'
              }
              this._$post(PostUrl.t04000143, param).then(res => {
                if(res.code === '0000'){
                  if(res.gROUP_EXECV.length>0){
                    this.formData.corpPostArray = res.gROUP_EXECV  // 高管列表 C120
                    this.formData.corpPostArray.forEach(item => {
                      item.postn = item.sEL_SER_CHANL_NO              // 职务
                      item.name = item.fILE_PATH                      // 姓名
                      item.engageTindsYearNum = item.cREDIT_POLICY_CD // 从事本行业年限
                      item.contTel = item.pAYEE_ACCNO                 // 联系电话
                      item.eduBgd = item.iNST_NAME                    // 学历
                    })
                    Toast.makeTextShort('同步成功')
                  }else{
                    Toast.makeTextShort('返回数据为空')
                  }
                }else{
                  this._$showInfo(res.msg)
                }
              }).catch(error => {
                this._$showInfo(error)
              })
            },
            onSave (type) {
              if(type === 'tempSave') {
                const form = this.$clone(this.form)

                this.$store.commit('toPublicInfoSet', {form})
                this.$emit('saveListen')
                return
              }
              let flag = true;
              if(this.formData.custType === '01'){
                this.$refs['perTypeMapForm'].validate((vali)=>{
                  if(!vali) return;
                  this.submit(type)
                })
              }
              else{
                this.$refs['lglerTypeMapForm'].validate((vali)=>{
                  console.log( this.formData.lglerTypeMap,'lglerTypeMap11')
                  if(!vali) return;
                  this.submit(type)
                })
              }
            },
            submit(type){
              let params = {
                custNo: this.$store.state.peanuts.custNo,
                custType: this.formData.custType,
                dataMap: JSON.parse(JSON.stringify(this.formData))
              }
              this._$post(PostUrl.addCopownerRelatePersonBasInfo, params).then(successResponce => {
                if (successResponce.code === '0000') {
                  if(type === 'save') this._$showInfo('保存成功')
                } else {
                    this._$showInfo(successResponce.msg) // undefined
                }
              }).catch(failResponce => {
                this._$showInfo(failResponce)
              })
            },
            showSwitch1(temp){
              this.showFlag1 = temp
            },
            selectedChang(data){
              if(data[0].value.length > 4){
                this.formData.lglerTypeMap.belongIndsCode = data[0].value
                this.formData.lglerTypeMap.belongIndsCodeTitle = data[0].title
                this.showSwitch1(false)
              }
            },
            recursion(data,industryData){
              industryData.forEach(item => {
                item.value === data ? this.formData.lglerTypeMap.belongIndsCodeTitle = item.title : null
                item.children && item.children.length > 0 ? this.recursion(data,item.children) : null
              })
            },

            handleInitData () {
              console.log(this.$store.state.company.toPublicInfo, 'initFormList3')
              this.formList = this.$clone(this.formListCopy)
              this.formList.forEach( item => {
                // 设置form的值
                const value = (item.value === 0 || item.value) ? item.value : ''
                const formValue = this.toPublicInfo[item.id] ? this.toPublicInfo[item.id] : value
                this.$set(this.form, [item.id], formValue)

                if(item.type === 'telInput') {
                  const inputId1 = this.toPublicInfo[item.inputId1] ? this.toPublicInfo[item.inputId1] : ''
                  const inputId2 = this.toPublicInfo[item.inputId2] ? this.toPublicInfo[item.inputId2] : ''
                  this.$set(this.form, [item.inputId1], inputId1)
                  this.$set(this.form, [item.inputId2], inputId2)
                }
                
                const nationList = ['lglerProvName', 'lglerCityName', 'lglerAreaCountyAddr',
                  'agentPersProvName', 'agentPersCityName', 'agentPersAreaCountyAddr',
                  'finRepPersProvName', 'finRepPersCityName', 'finRepPersAreaCountyName',
                  'oprtorProvCd', 'oprtorCityCd', 'oprtorAreaCountyName',]

                if(item.type === 'telInput') {
                  this.$set(this.rules, [item.id], telValidator)
                } else if(['lglPersName', 'agentPersName', 'finRepPersName', 'oprtorName'].includes(item.id)) {
                  this.$set(this.rules, [item.id], nameValidator())
                } else if(item.type === 'cardCodeInput') {
                  this.$set(this.rules, [item.id], cardTypeValidator)
                } else if(item.type === 'date') {
                  this.$set(this.rules, [item.id], startDateValidator())
                } else if(item.type === 'date1') {
                  this.$set(this.rules, [item.id], endDateValidator)
                } else if(nationList.includes(item.id)) {
                  this.$set(this.rules, [item.id], nationValidator)
                } else if(item.required) {
                  this.$set(this.rules, [item.id], emptyValidator())
                }
              })

              if(this.form.bfcyWRelNatuerFitFlag === '1') { // 67
                this.form.earningsInfoArray = []
              }

              this.holdingFormList.forEach( item => {
                if(item.id === 'thhappSerTellerNo') {
                  this.$set(this.rules, [item.id], telValidator)
                } else if(item.id === 'studyCollge') {
                  this.$set(this.rules, [item.id], nameValidator())
                } else if(item.id === 'addTxFlag') {
                  this.$set(this.rules, [item.id], cardTypeValidator)
                } else if(item.id === 'certEffDt') {
                  this.$set(this.rules, [item.id], startDateValidator())
                } else if(item.id === 'updateInsts') {
                  this.$set(this.rules, [item.id], endDateValidator)
                } else if(item.required) {
                  this.$set(this.rules, [item.id], emptyValidator())
                }
              })

              this.personFormList.forEach( item => {
                if(item.id === 'thhappSerTellerNo') {
                  this.$set(this.rules, [item.id], telValidator)
                } else if(item.id === 'naturalName') {
                  this.$set(this.rules, [item.id], nameValidator())
                } else if(item.id === 'naturalCertNo') {
                  this.$set(this.rules, [item.id], cardTypeValidator)
                } else if(item.id === 'certEffDt') {
                  this.$set(this.rules, [item.id], startDateValidator())
                } else if(item.id === 'naturalLastDate') {
                  this.$set(this.rules, [item.id], endDateValidator)
                } else if(item.id === 'shrHoldRatio') {
                  this.$set(this.rules, [item.id], percentValidator())
                } else if(item.required) {
                  this.$set(this.rules, [item.id], emptyValidator())
                }
              })

              this.earningsFormList.forEach( item => {
                if(item.id === 'thhappSerTellerNo') {
                  this.$set(this.rules, [item.id], telValidator)
                } else if(item.id === 'studyCollge') {
                  this.$set(this.rules, [item.id], nameValidator())
                } else if(item.id === 'appSerTellerNo') {
                  this.$set(this.rules, [item.id], cardTypeValidator)
                } else if(item.id === 'certEffDt') {
                  this.$set(this.rules, [item.id], startDateValidator())
                } else if(item.id === 'updateInsts') {
                  this.$set(this.rules, [item.id], endDateValidator)
                } else if(item.required) {
                  this.$set(this.rules, [item.id], emptyValidator())
                }
              })
            },
            // 监听结构
            formListListen () {
                const NATIONALITY = this.selectData.NATIONALITY.filter(it => it.key !== 'CHN')
                const nationality = [{key: 'CHN', value: '中国'}, ...NATIONALITY]

                this.formList.forEach(item => {
                  let options = []
                  if(item.id === 'lglerNationCode') { // 管理人国籍
                    item.options = nationality
                  } else if(item.id === 'lglerProvName') { // 管理人省
                    item.disabled = this.form.lglerNationCode !== 'CHN'
                    item.required = this.form.lglerNationCode === 'CHN'
                    item.options = this.provinceOPtions()
                  } else if(item.id === 'lglerCityName') { // 管理人市
                    item.disabled = this.form.lglerNationCode !== 'CHN'
                    item.required = this.form.lglerNationCode === 'CHN'
                    item.options = this.cityOptions('lglerProvName')
                  } else if(item.id === 'lglerAreaCountyAddr') { // 管理人县/区
                    item.disabled = this.form.lglerNationCode !== 'CHN'
                    item.required = this.form.lglerNationCode === 'CHN'
                    item.options = this.areaCountyOptions('lglerCityName')
                  } else if(item.id === 'agentPersNationCode') { // 单位授权人国籍
                    item.options = nationality
                  } else if(item.id === 'agentPersProvName') { // 单位授权人省
                    item.disabled = this.form.agentPersNationCode !== 'CHN'
                    item.required = this.form.agentPersNationCode === 'CHN'
                    item.options = this.provinceOPtions()
                  } else if(item.id === 'agentPersCityName') { // 单位授权人市
                    item.disabled = this.form.agentPersNationCode !== 'CHN'
                    item.required = this.form.agentPersNationCode === 'CHN'
                    item.options = this.cityOptions('agentPersProvName')
                  } else if(item.id === 'agentPersAreaCountyAddr') { // 单位授权人县/区
                    item.disabled = this.form.agentPersNationCode !== 'CHN'
                    item.required = this.form.agentPersNationCode === 'CHN'
                    item.options = this.areaCountyOptions('agentPersCityName')
                  } else if(item.id === 'finRepPersNationCode') { // 财务负责人国籍
                    item.options = nationality
                  } else if(item.id === 'finRepPersProvName') { // 财务负责人省
                    item.disabled = this.form.finRepPersNationCode !== 'CHN'
                    item.required = this.form.finRepPersNationCode === 'CHN'
                    item.options = this.provinceOPtions()
                  } else if(item.id === 'finRepPersCityName') { // 财务负责人市
                    item.disabled = this.form.finRepPersNationCode !== 'CHN'
                    item.required = this.form.finRepPersNationCode === 'CHN'
                    item.options = this.cityOptions('finRepPersProvName')
                  } else if(item.id === 'finRepPersAreaCountyName') { // 财务负责人县/区
                    item.disabled = this.form.finRepPersNationCode !== 'CHN'
                    item.required = this.form.finRepPersNationCode === 'CHN'
                    item.options = this.areaCountyOptions('finRepPersCityName')
                  } else if(item.id === 'oprtorNationCode') { // 经办人国籍
                    item.options = nationality
                  } else if(item.id === 'oprtorProvCd') { // 经办人省
                    item.disabled = this.form.oprtorNationCode !== 'CHN'
                    item.required = this.form.oprtorNationCode === 'CHN'
                    item.options = this.provinceOPtions()
                  } else if(item.id === 'oprtorCityCd') { // 经办人市
                    item.disabled = this.form.oprtorNationCode !== 'CHN'
                    item.required = this.form.oprtorNationCode === 'CHN'
                    item.options = this.cityOptions('oprtorProvCd')
                  } else if(item.id === 'oprtorAreaCountyName') { // 经办人县/区
                    item.disabled = this.form.oprtorNationCode !== 'CHN'
                    item.required = this.form.oprtorNationCode === 'CHN'
                    item.options = this.areaCountyOptions('oprtorCityCd')
                  } else if(item.id === 'oprtorInfoTpCd') { // 经办人信息复用
                    options = this.$clone(oprtorInfoTpCdOption)
                    if(this.form.ifAuthorizedPerson !== '1') {
                      options = this.$filterDic(oprtorInfoTpCdOption, ['1'], 'non')
                    }
                    item.options = options
                  } else if(item.id === 'btnPerNum') { // 受益所有人数量
                      item.disabled = this.form.bfcyWRelNatuerFitFlag === '1'
                  }
                  
                  // 是否存在单位授权人
                  const ifAuthorizedPersonHide = this.form.ifAuthorizedPerson !== '1'
                  if(ifAuthorizedPersonList.includes(item.id)) {
                    item.hide = ifAuthorizedPersonHide
                  }
                  // 财务负责人与管理人是否一致
                  const finoffWLgrpsFitFlagHide = this.form.finoffWLgrpsFitFlag === '1'
                  if(finoffWLgrpsFitFlagList.includes(item.id)) {
                    item.hide = finoffWLgrpsFitFlagHide
                  }
                  // 是否管理人办理
                  const agentFlagHide = this.form.agentFlag === '1'
                  const agentFlagHideList = ['oprtorInfoTpCd', ...agentFlagList]
                  if(agentFlagHideList.includes(item.id)) {
                    item.hide = agentFlagHide
                  }

                  // 是否需要受益人识别
                  const needRecognBfcyFlagList = ['companyAttr', 'bfcyWRelNatuerFitFlag', 'naturalPerNum', 'btnPerNum']
                  if(needRecognBfcyFlagList.includes(item.id)) {
                    item.hide = this.form.needRecognBfcyFlag !== '1'
                  }

                  item.disabled = item.disabled || this.toPublicInfo.busiStatus !== '10'
                  item.btnDisabled = this.toPublicInfo.busiStatus !== '10'
                })

                this.holdingFormList.forEach( item => {
                  if(item.id === 'psninfoMtpxTpCd') { // 控股股东/实际控制人信息复用
                    const options = [{key: '0', value: '管理人'}]
                    if(this.form.ifAuthorizedPerson === '1') {
                      options.push({key: '1', value: '单位授权人'})
                    }
                    options.push({key: '2', value: '财务负责人'})
                    if (this.form.agentFlag !== '1') {
                      options.push({key: '3', value: '代理（经办）人'})
                    }
                    options.push({key: '99', value: '其他'})
                    item.options = options
                  } else if(item.id === 'nationCode') { // 控股股东/实际控制人国籍
                    item.options = nationality
                  }
                  item.disabled = this.toPublicInfo.busiStatus !== '10'
                  item.btnDisabled = this.toPublicInfo.busiStatus !== '10'
                })

                this.personFormList.forEach( item => {
                  if(item.id === 'nationCode') { // 国籍
                    item.options = nationality
                  }
                  item.disabled = this.toPublicInfo.busiStatus !== '10'
                  item.btnDisabled = this.toPublicInfo.busiStatus !== '10'
                })

                this.earningsFormList.forEach( item => {
                  if(item.id === 'nationCode') { // 国籍
                    item.options = nationality
                  }
                  item.disabled = this.toPublicInfo.busiStatus !== '10'
                  item.btnDisabled = this.toPublicInfo.busiStatus !== '10'
                })
            },
            // 监听数据
            formChangeListen (item) {
              const emitObj = {
                lglerNationCode: 'lglerProvName',
                lglerProvName: 'lglerCityName',

                agentPersNationCode: 'agentPersProvName',
                agentPersProvName: 'agentPersCityName',

                finRepPersNationCode: 'finRepPersProvName',
                finRepPersProvName: 'finRepPersCityName',

                oprtorNationCode: 'oprtorProvCd',
                oprtorProvCd: 'oprtorCityCd',
              }
              const emptyObj = {
                // 区
                lglerCityName: 'lglerAreaCountyAddr',
                agentPersCityName: 'agentPersAreaCountyAddr',
                finRepPersCityName: 'finRepPersAreaCountyName',
                oprtorCityCd: 'oprtorAreaCountyName',
                // 联网核查
                lglPersName: 'lglerCertType1',
                lglPersCertNo: 'lglerCertType1',

                agentPersName: 'agentPersCertType1',
                agentPersCertNo: 'agentPersCertType1',

                finRepPersName: 'finRepPersCertType1',
                finRepPersCertNo: 'finRepPersCertType1',

                oprtorName: 'oprtorCertType1',
                oprtorCertNo: 'oprtorCertType1',
              }
              if (emitObj[item.id]) { // 国籍 省
                this.emptyEmitListen(emitObj[item.id])
              } else if (emptyObj[item.id]) { // 市
                this.emptyListen(emptyObj[item.id])
              }

              if(lgler.includes(item.id)) { // 管理人
                if(this.form.finoffWLgrpsFitFlag === '1') this.finRepPersListen()
                if(this.form.agentFlag === '1') this.oprtorListen()
                const index = this.form.holdingInfos.findIndex(item => item.psninfoMtpxTpCd === '0')
                this.holdingInfoItemListen(index)

                const personInfoIndex = this.form.personInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '1')
                this.personInfoItemListen(personInfoIndex)

                const earningsInfoIndex = this.form.earningsInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '1')
                this.earningsInfoItemListen(earningsInfoIndex)
                return
              }
              if(ifAuthorizedPersonList.includes(item.id)) { // 单位授权人
                if(this.form.oprtorInfoTpCd === '1') this.oprtorListen()
                const index = this.form.holdingInfos.findIndex(item => item.psninfoMtpxTpCd === '1')
                this.holdingInfoItemListen(index)

                const personInfoIndex = this.form.personInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '3')
                this.personInfoItemListen(personInfoIndex)

                const earningsInfoIndex = this.form.earningsInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '3')
                this.earningsInfoItemListen(earningsInfoIndex)
                return
              }
              if(finoffWLgrpsFitFlagList.includes(item.id)) { // 财务负责人
                if(this.form.oprtorInfoTpCd === '2') this.oprtorListen()
                const index = this.form.holdingInfos.findIndex(item => item.psninfoMtpxTpCd === '2')
                this.holdingInfoItemListen(index)

                const personInfoIndex = this.form.personInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '2')
                this.personInfoItemListen(personInfoIndex)

                const earningsInfoIndex = this.form.earningsInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '2')
                this.earningsInfoItemListen(earningsInfoIndex)
                return
              }
              if(agentFlagList.includes(item.id)) { // 经办人
                const index = this.form.holdingInfos.findIndex(item => item.psninfoMtpxTpCd === '3')
                this.holdingInfoItemListen(index)

                const personInfoIndex = this.form.personInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '4')
                this.personInfoItemListen(personInfoIndex)

                const earningsInfoIndex = this.form.earningsInfoArray.findIndex(item => item.rnboerInfoMtpxTpCd === '4')
                this.earningsInfoItemListen(earningsInfoIndex)
                return
              }

              if(item.id === 'ifAuthorizedPerson') {
                this.ifAuthorizedPersonListen()
                this.oprtorInfoTpCdListen()
                return
              }
              if(item.id === 'finoffWLgrpsFitFlag') {
                this.finRepPersListen()
                return
              }
              if(item.id === 'agentFlag') {
                this.oprtorInfoTpCdListen()
                return
              }
              if(item.id === 'oprtorInfoTpCd') {
                this.oprtorListen()
                return
              }
              if(item.id === 'holdingsCount') {
                this.holdingInfosListen()
                return
              }
              if(item.id === 'needRecognBfcyFlag') {
                this.companyAttrListen()
                this.bfcyWRelNatuerFitFlagListen()
                this.naturalPerNumListen()
                return
              }
              if(item.id === 'bfcyWRelNatuerFitFlag') {
                this.btnPerNumListen()
                return
              }
              if(item.id === 'naturalPerNum') {
                this.personInfoArrayListen()
                if(this.form.bfcyWRelNatuerFitFlag === '1') this.btnPerNumListen()
                return
              }
              if(item.id === 'btnPerNum') {
                this.earningsInfoArrayListen()
                return
              }
            },
            // 是否存在单位授权人
            ifAuthorizedPersonListen () {
              ifAuthorizedPersonList.forEach(item => {
                this.form[item] = ''
              })
            },
            // 财务负责人信息
            finRepPersListen () {
                if(this.form.finoffWLgrpsFitFlag === '1') {
                  this.form.finRepPersName = this.form.lglPersName
                  this.form.finRepPersCertType = this.form.lglerCertType
                  this.form.finRepPersCertNo = this.form.lglPersCertNo
                  this.form.finoffCertEffDt = this.form.lgrpsCertEffDt
                  this.form.finRepPersCertDueDate = this.form.lglerCertDueDate
                  this.form.finRepPersTelAreaNo = this.form.dmstTelAreaNo
                  this.form.finRepPersContTel = this.form.lglerContTel
                  this.form.finRepPersSpecificAddr = this.form.lglerSpecificAddr
                  this.form.finRepPersNationCode = this.form.lglerNationCode
                  this.form.finRepPersProvName = this.form.lglerProvName
                  this.form.finRepPersCityName = this.form.lglerCityName
                  this.form.finRepPersAreaCountyName = this.form.lglerAreaCountyAddr
              } else {
                finoffWLgrpsFitFlagList.forEach(item => {
                  this.form[item] = ''
                })
              }
              this.formChangeListen({id: 'finRepPersName'})
            },
            // 经办人信息复用
            oprtorInfoTpCdListen () {
              this.form.oprtorInfoTpCd = ''
              this.formChangeListen({id: 'oprtorInfoTpCd'})
            },
            // 经办人信息
            oprtorListen () {
              if (this.form.agentFlag === '1') { // 管理员
                this.form.oprtorName = this.form.lglPersName
                this.form.oprtorCertType = this.form.lglerCertType
                this.form.oprtorCertNo = this.form.lglPersCertNo
                this.form.oprtorCertEffDt = this.form.lgrpsCertEffDt
                this.form.oprtorCertDueDate = this.form.lglerCertDueDate
                this.form.oprtorTelAreaNo = this.form.dmstTelAreaNo
                this.form.oprtorMobile = this.form.lglerContTel
                this.form.oprtorContAddr = this.form.lglerSpecificAddr
                this.form.oprtorNationCode = this.form.lglerNationCode
                this.form.oprtorProvCd = this.form.lglerProvName
                this.form.oprtorCityCd = this.form.lglerCityName
                this.form.oprtorAreaCountyName = this.form.lglerAreaCountyAddr
              } else if (this.form.oprtorInfoTpCd === '1') { // 单位授权人
                this.form.oprtorName = this.form.agentPersName
                this.form.oprtorCertType = this.form.agentPersCertType
                this.form.oprtorCertNo = this.form.agentPersCertNo
                this.form.oprtorCertEffDt = this.form.authorCertEffDt
                this.form.oprtorCertDueDate = this.form.agtPersCertDueDate
                this.form.oprtorTelAreaNo = this.form.agtPersTelAreaNo
                this.form.oprtorMobile = this.form.agentPersContTel
                this.form.oprtorContAddr = this.form.agentPersSpecificAddr
                this.form.oprtorNationCode = this.form.agentPersNationCode
                this.form.oprtorProvCd = this.form.agentPersProvName
                this.form.oprtorCityCd = this.form.agentPersCityName
                this.form.oprtorAreaCountyName = this.form.agentPersAreaCountyAddr
              } else if (this.form.oprtorInfoTpCd === '2') { // 财务负责人
                this.form.oprtorName = this.form.finRepPersName
                this.form.oprtorCertType = this.form.finRepPersCertType
                this.form.oprtorCertNo = this.form.finRepPersCertNo
                this.form.oprtorCertEffDt = this.form.finoffCertEffDt
                this.form.oprtorCertDueDate = this.form.finRepPersCertDueDate
                this.form.oprtorTelAreaNo = this.form.finRepPersTelAreaNo
                this.form.oprtorMobile = this.form.finRepPersContTel
                this.form.oprtorContAddr = this.form.finRepPersSpecificAddr
                this.form.oprtorNationCode = this.form.finRepPersNationCode
                this.form.oprtorProvCd = this.form.finRepPersProvName
                this.form.oprtorCityCd = this.form.finRepPersCityName
                this.form.oprtorAreaCountyName = this.form.finRepPersAreaCountyName
              } else {
                agentFlagList.forEach(item => {
                  this.form[item] = ''
                })
              }
              this.formChangeListen({id: 'oprtorName'})
            },
            // 控股股东/实际控制人员信息 数量改变
            holdingInfosListen () {
              let start = this.form.holdingInfos.length
              let end = Number(this.form.holdingsCount)
              let add = Math.abs(end - start)
              if (start < end) { // 新增关联自然人的数量
                for (let i = 0; i < add; i++) {
                  // 循环添加需要 不同的引用地址
                  this.form.holdingInfos.push(this.$clone(holdingInfo))
                }
              } else {
                this.form.holdingInfos.splice(end, add)
              }
            },
            // formList
            holdingFormListFilter (item) {
              const list = this.$clone(this.holdingFormList)
              list.forEach(it => {
                if(it.id === 'selSerChanlNo') {
                  let options = this.$clone(lglerCertTypeOption)
                  if(item.keyPerTpCd === '2') options = this.$clone(selSerChanlNoOption)
                  it.options = options
                }
              })
              return list
            },
            holdingInfoFormChange (item, index) {
              if(item.id === 'psninfoMtpxTpCd') {
                const psninfoMtpxTpCd = this.form.holdingInfos[index].psninfoMtpxTpCd
                const repeatList = this.form.holdingInfos.filter( item => item.psninfoMtpxTpCd === psninfoMtpxTpCd)
                if(psninfoMtpxTpCd && psninfoMtpxTpCd !== '99' && repeatList.length > 1) {
                  this.form.holdingInfos[index].psninfoMtpxTpCd = ''
                  const psninfoMtpxTpCdObj = {
                    '0': '管理人',
                    '1': '单位授权人',
                    '2': '财务负责人',
                    '3': '代理（经办）人',
                  }
                  this._$showInfo(`${psninfoMtpxTpCdObj[psninfoMtpxTpCd]}仅支持选择复用一次`)
                  return
                }
                this.holdingInfoItemListen(index)
              } else {
                if(item.id === 'keyPerTpCd') {
                  this.form.holdingInfos[index].selSerChanlNo = ''
                }
                const personInfoIndex = this.form.personInfoArray.findIndex(item => (item.rnboerInfoMtpxTpCd - 5) === index)
                this.personInfoItemListen(personInfoIndex)

                const earningsInfoIndex = this.form.earningsInfoArray.findIndex(item => (item.rnboerInfoMtpxTpCd - 5) === index)
                this.earningsInfoItemListen(earningsInfoIndex)
              }
            },
            holdingInfoBtnListen (item, index) {
              const listItem =this.form.holdingInfos[index]
              if(['date', 'date1'].includes(item.type)) {
                listItem[item.id] = dateObj[item.btnType] || ''
              }  else if (item.type === 'cardCodeInput') {
                  if(!listItem[item.id] || !listItem[item.rulePre1]) {
                    this._$showInfo('仅当证件类型为居民身份证、临时身份证时进行联网核查且证件号码和证件姓名不能为空!')
                    return
                  }
                  this.onlineV2({
                    personCode: listItem[item.id], // 证件号码
                    customerName: listItem[item.rulePre1], // 客户姓名
                    type: item.rulePre + '1',
                    item: listItem
                  })
              }
              this.holdingInfoFormChange(item, index)
            },
            holdingInfoInputListen (item, index) {
                if(['telInput'].includes(item.type)) {
                  this.form.holdingInfos[index][item.id] = this.form.holdingInfos[index][item.id].replace(/[^0-9.]+/g,'')
                  return
                }
            },
            // 控股股东/实际控制人员信息 数据改变
            holdingInfoItemListen (index) {
              if(index < 0) return
              const item = this.form.holdingInfos[index]
              if(item.psninfoMtpxTpCd === '0') { // 管理员
                item.keyPerTpCd = '1'
                item.studyCollge = this.form.lglPersName
                item.selSerChanlNo = this.form.lglerCertType
                item.addTxFlag = this.form.lglPersCertNo
                item.certEffDt = this.form.lgrpsCertEffDt
                item.updateInsts = this.form.lglerCertDueDate
                item.telAreaNo = this.form.dmstTelAreaNo
                item.appSerTellerNo = this.form.lglerContTel
                item.acctChara = this.form.lglerSpecificAddr
                item.nationCode = this.form.lglerNationCode
              } else if(item.psninfoMtpxTpCd === '1') { // 单位授权人
                item.keyPerTpCd = '1'
                item.studyCollge = this.form.agentPersName
                item.selSerChanlNo = this.form.agentPersCertType
                item.addTxFlag = this.form.agentPersCertNo
                item.certEffDt = this.form.authorCertEffDt
                item.updateInsts = this.form.agtPersCertDueDate
                item.telAreaNo = this.form.agtPersTelAreaNo
                item.appSerTellerNo = this.form.agentPersContTel
                item.acctChara = this.form.agentPersSpecificAddr
                item.nationCode = this.form.agentPersNationCode
              } else if (item.psninfoMtpxTpCd === '2') { // 财务负责人
                item.keyPerTpCd = '1'
                item.studyCollge = this.form.finRepPersName
                item.selSerChanlNo = this.form.finRepPersCertType
                item.addTxFlag = this.form.finRepPersCertNo
                item.certEffDt = this.form.finoffCertEffDt
                item.updateInsts = this.form.finRepPersCertDueDate
                item.telAreaNo = this.form.finRepPersTelAreaNo
                item.appSerTellerNo = this.form.finRepPersContTel
                item.acctChara = this.form.finRepPersSpecificAddr
                item.nationCode = this.form.finRepPersNationCode
              } else if (item.psninfoMtpxTpCd === '3') { // 经办人
                item.keyPerTpCd = '1'
                item.studyCollge = this.form.oprtorName
                item.selSerChanlNo = this.form.oprtorCertType
                item.addTxFlag = this.form.oprtorCertNo
                item.certEffDt = this.form.oprtorCertEffDt
                item.updateInsts = this.form.oprtorCertDueDate
                item.telAreaNo = this.form.oprtorTelAreaNo
                item.appSerTellerNo = this.form.oprtorMobile
                item.acctChara = this.form.oprtorContAddr
                item.nationCode = this.form.oprtorNationCode
              } else {
                item.studyCollge = ''
                item.selSerChanlNo = ''
                item.addTxFlag = ''
                item.certEffDt = ''
                item.updateInsts = ''
                item.telAreaNo = ''
                item.appSerTellerNo = ''
                item.acctChara = ''
                item.nationCode = ''
              }
              const personInfoIndex = this.form.personInfoArray.findIndex(item => (item.rnboerInfoMtpxTpCd - 5) === index)
              this.personInfoItemListen(personInfoIndex)

              const earningsInfoIndex = this.form.earningsInfoArray.findIndex(item => (item.rnboerInfoMtpxTpCd - 5) === index)
              this.earningsInfoItemListen(earningsInfoIndex)
            },
            // 单位性质-客户识别
            companyAttrListen () {
              this.form.companyAttr = ''
            },
            // 受益所有人信息与关联自然人信息是否一致
            bfcyWRelNatuerFitFlagListen () {
              this.form.bfcyWRelNatuerFitFlag = ''
              this.formChangeListen({id: 'bfcyWRelNatuerFitFlag'})
            },
            // 关联自然人数量
            naturalPerNumListen () {
              this.form.naturalPerNum = ''
              this.formChangeListen({id: 'naturalPerNum'})
            },
            // 受益所有人数量
            btnPerNumListen () {
              if(this.form.bfcyWRelNatuerFitFlag === '1') {
                this.form.btnPerNum = this.form.naturalPerNum
              }
              this.formChangeListen({id: 'btnPerNum'})
            },
            // 关联自然人
            personInfoArrayListen () {
              let start = this.form.personInfoArray.length
              let end = Number(this.form.naturalPerNum)
              let add = Math.abs(end - start)
              if (start < end) { // 新增关联自然人的数量
                for (let i = 0; i < add; i++) {
                  this.form.personInfoArray.push(this.$clone(personInfo))
                }
              } else {
                this.form.personInfoArray.splice(end, add)
              }
            },
            // formList
            personFormListFilter (item) {
              const list = this.$clone(this.personFormList)
              list.forEach(it => {
                if(it.id === 'rnboerInfoMtpxTpCd') {
                    let options = [{key: '1', value: '管理人'}]
                    if(!['F', 'G'].includes(item.naturalAttrType)) {
                      options.push({key: '2', value: '财务负责人'})
                      if(this.form.ifAuthorizedPerson === '1') {
                        options.push({key: '3', value: '授权代理人'})
                      }
                      if (this.form.agentFlag !== '1') {
                        options.push({key: '4', value: '经办人'})
                      }
                      this.form.holdingInfos.forEach((holdingInfoItem, index) => {
                        options.push({key: `${index + 5}`, value: `控股股东/实际控制人${index + 1}`})
                      })
                    }
                    options.push({key: '99', value: '其他'})
                    it.options = options
                } else if (it.id === 'shrHoldRatio') {
                  it.hide = !['A-1', 'A-2', 'B-1', 'D-1'].includes(item.naturalAttrType)
                }
              })
              return list
            },
            personInfoFormChange (item, index) {
              if(item.id === 'naturalAttrType') {
                this.form.personInfoArray[index].rnboerInfoMtpxTpCd = ''
              } else if(item.id === 'rnboerInfoMtpxTpCd') {
                const psninfoMtpxTpCd = this.form.personInfoArray[index].rnboerInfoMtpxTpCd
                const repeatList = this.form.personInfoArray.filter( item => item.rnboerInfoMtpxTpCd === psninfoMtpxTpCd)
                if(psninfoMtpxTpCd && psninfoMtpxTpCd !== '99' && repeatList.length > 1) {
                  this.form.personInfoArray[index].rnboerInfoMtpxTpCd = ''
                  const psninfoMtpxTpCdObj = {
                    '1': '管理人',
                    '2': '财务负责人',
                    '3': '授权代理人',
                    '4': '经办人',
                    '5': '控股股东/实际控制人1',
                    '6': '控股股东/实际控制人2',
                    '7': '控股股东/实际控制人3',
                    '8': '控股股东/实际控制人4',
                    '9': '控股股东/实际控制人5',
                    '10': '控股股东/实际控制人6',
                    '11': '控股股东/实际控制人7',
                  }
                  this._$showInfo(`${psninfoMtpxTpCdObj[psninfoMtpxTpCd]}仅支持选择复用一次`)
                  return
                }
                this.personInfoItemListen(index)
              } else if (item.id === 'shrHoldRatio') {
                const re = /(^[0-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/
                let total = 0
                this.form.personInfoArray.forEach(item => {
                  if(re.test(item.shrHoldRatio)) {
                    total += Number(item.shrHoldRatio)
                  }
                })
                if(total > 100) {
                  this.form.personInfoArray[index].shrHoldRatio = ''
                  this._$showInfo('关联自然人持股比例相加不得超过100%！')
                }
              }
            },
            personInfoBtnListen (item, index) {
              const listItem = this.form.personInfoArray[index]
              if(['date', 'date1'].includes(item.type)) {
                listItem[item.id] = dateObj[item.btnType] || ''
              } else if (item.type === 'cardCodeInput') {
                  if(!listItem[item.id] || !listItem[item.rulePre1]) {
                    this._$showInfo('仅当证件类型为居民身份证、临时身份证时进行联网核查且证件号码和证件姓名不能为空!')
                    return
                  }
                  this.onlineV2({
                    personCode: listItem[item.id], // 证件号码
                    customerName: listItem[item.rulePre1], // 客户姓名
                    type: item.rulePre + '1',
                    item: listItem
                  })
              }
            },
            personInfoInputListen (item, index) {
                if(['telInput'].includes(item.type)) {
                  this.form.personInfoArray[index][item.id] = this.form.personInfoArray[index][item.id].replace(/[^0-9.]+/g,'')
                  return
                }
                if(['input3to2'].includes(item.type)) {
                  let temp = this.form.personInfoArray[index][item.id]
                  const length = temp.length
                  temp = temp.replace(/[^0-9.]+/g,'')
                  if(temp.indexOf('.') !== temp.lastIndexOf('.')) {
                    temp = ''
                  }
                  if(temp > 100 || !temp) {
                    temp = ''
                  } else {
                    const index = temp.indexOf('.')
                    if(index !== -1 && index + 1 < length - 2) {
                      temp = Number(temp).toFixed(2)
                    }
                  }
                  this.form.personInfoArray[index][item.id] = temp
                  return
                }
            },
            // 数据改变
            personInfoItemListen (index) {
              if(index < 0) return
              const item = this.form.personInfoArray[index]
              if(item.rnboerInfoMtpxTpCd === '1') { // 管理员
                item.naturalName = this.form.lglPersName
                item.naturalCertType = this.form.lglerCertType
                item.naturalCertNo = this.form.lglPersCertNo
                item.certEffDt = this.form.lgrpsCertEffDt
                item.naturalLastDate = this.form.lglerCertDueDate
                item.telAreaNo = this.form.dmstTelAreaNo
                item.appSerTellerNo = this.form.lglerContTel
                item.naturalAddress = this.form.lglerSpecificAddr
                item.nationCode = this.form.lglerNationCode
              } else if(item.rnboerInfoMtpxTpCd === '3') { // 单位授权人
                item.naturalName = this.form.agentPersName
                item.naturalCertType = this.form.agentPersCertType
                item.naturalCertNo = this.form.agentPersCertNo
                item.certEffDt = this.form.authorCertEffDt
                item.naturalLastDate = this.form.agtPersCertDueDate
                item.telAreaNo = this.form.agtPersTelAreaNo
                item.appSerTellerNo = this.form.agentPersContTel
                item.naturalAddress = this.form.agentPersSpecificAddr
                item.nationCode = this.form.agentPersNationCode
              } else if (item.rnboerInfoMtpxTpCd === '2') { // 财务负责人
                item.naturalName = this.form.finRepPersName
                item.naturalCertType = this.form.finRepPersCertType
                item.naturalCertNo = this.form.finRepPersCertNo
                item.certEffDt = this.form.finoffCertEffDt
                item.naturalLastDate = this.form.finRepPersCertDueDate
                item.telAreaNo = this.form.finRepPersTelAreaNo
                item.appSerTellerNo = this.form.finRepPersContTel
                item.naturalAddress = this.form.finRepPersSpecificAddr
                item.nationCode = this.form.finRepPersNationCode
              } else if (item.rnboerInfoMtpxTpCd === '4') { // 经办人
                item.naturalName = this.form.oprtorName
                item.naturalCertType = this.form.oprtorCertType
                item.naturalCertNo = this.form.oprtorCertNo
                item.certEffDt = this.form.oprtorCertEffDt
                item.naturalLastDate = this.form.oprtorCertDueDate
                item.telAreaNo = this.form.oprtorTelAreaNo
                item.appSerTellerNo = this.form.oprtorMobile
                item.naturalAddress = this.form.oprtorContAddr
                item.nationCode = this.form.oprtorNationCode
              } else if (['5', '6', '7', '8', '9', '10', '11'].includes(item.rnboerInfoMtpxTpCd)) { // 控股股东/实际控制人
                const it = this.form.holdingInfos[item.rnboerInfoMtpxTpCd - 5]
                item.naturalName = it.studyCollge
                item.naturalCertType = it.selSerChanlNo
                item.naturalCertNo = it.addTxFlag
                item.certEffDt = it.certEffDt
                item.naturalLastDate = it.updateInsts
                item.telAreaNo = it.telAreaNo
                item.appSerTellerNo = it.appSerTellerNo
                item.naturalAddress = it.naturalAddress
                item.nationCode = it.nationCode
              } else {
                item.naturalName = ''
                item.naturalCertType = ''
                item.naturalCertNo = ''
                item.certEffDt = ''
                item.naturalLastDate = ''
                item.telAreaNo = ''
                item.appSerTellerNo = ''
                item.acctChara = ''
                item.nationCode = ''
              }
            },
            // 受益所有人
            earningsInfoArrayListen () {
              if(this.form.bfcyWRelNatuerFitFlag === '1') {
                this.form.earningsInfoArray = []
                return
              }
              let start = this.form.earningsInfoArray.length
              let end = Number(this.form.btnPerNum)
              let add = Math.abs(end - start)
              if (start < end) { // 新增的数量
                for (let i = 0; i < add; i++) {
                  this.form.earningsInfoArray.push(this.$clone(earningsInfo))
                }
              } else {
                this.form.earningsInfoArray.splice(end, add)
              }
            },
            // formList
            earningsFormListFilter (item) {
              const list = this.$clone(this.earningsFormList)
              list.forEach(it => {
                if(it.id === 'rnboerInfoMtpxTpCd') {
                    let options = [{key: '1', value: '管理人'}]
                    if(!['F', 'G'].includes(item.nature)) {
                        options.push({key: '2', value: '财务负责人'})
                      if(this.form.ifAuthorizedPerson === '1') {
                        options.push({key: '3', value: '授权代理人'})
                      }
                      if (this.form.agentFlag !== '1') {
                        options.push({key: '4', value: '经办人'})
                      }
                      this.form.holdingInfos.forEach((holdingInfoItem, index) => {
                        options.push({key: `${index + 5}`, value: `控股股东/实际控制人${index + 1}`})
                      })
                    }
                    options.push({key: '99', value: '其他'})
                    it.options = options
                }
              })
              return list
            },
            earningsInfoFormChange (item, index) {
              if(item.id === 'nature') {
                this.form.earningsInfoArray[index].rnboerInfoMtpxTpCd = ''
              } else if(item.id === 'rnboerInfoMtpxTpCd') {
                const psninfoMtpxTpCd = this.form.earningsInfoArray[index].rnboerInfoMtpxTpCd
                const repeatList = this.form.earningsInfoArray.filter( item => item.rnboerInfoMtpxTpCd === psninfoMtpxTpCd)
                if(psninfoMtpxTpCd && psninfoMtpxTpCd !== '99' && repeatList.length > 1) {
                  this.form.earningsInfoArray[index].rnboerInfoMtpxTpCd = ''
                  const psninfoMtpxTpCdObj = {
                    '1': '管理人',
                    '2': '财务负责人',
                    '3': '授权代理人',
                    '4': '经办人',
                    '5': '控股股东/实际控制人1',
                    '6': '控股股东/实际控制人2',
                    '7': '控股股东/实际控制人3',
                    '8': '控股股东/实际控制人4',
                    '9': '控股股东/实际控制人5',
                    '10': '控股股东/实际控制人6',
                    '11': '控股股东/实际控制人7',
                  }
                  this._$showInfo(`${psninfoMtpxTpCdObj[psninfoMtpxTpCd]}仅支持选择复用一次`)
                  return
                }
                this.earningsInfoItemListen(index)
              }
            },
            earningsInfoBtnListen (item, index) {
              const listItem = this.form.earningsInfoArray[index]
              if(['date', 'date1'].includes(item.type)) {
                listItem[item.id] = dateObj[item.btnType] || ''
              } else if (item.type === 'cardCodeInput') {
                  if(!listItem[item.id] || !listItem[item.rulePre1]) {
                    this._$showInfo('仅当证件类型为居民身份证、临时身份证时进行联网核查且证件号码和证件姓名不能为空!')
                    return
                  }
                  this.onlineV2({
                    personCode: listItem[item.id], // 证件号码
                    customerName: listItem[item.rulePre1], // 客户姓名
                    type: item.rulePre + '1',
                    item: listItem
                  })
              }
            },
            earningsInfoInputListen (item, index) {
                if(['telInput'].includes(item.type)) {
                  this.form.earningsInfoArray[index][item.id] = this.form.earningsInfoArray[index][item.id].replace(/[^0-9.]+/g,'')
                  return
                }
            },
            // 数据改变
            earningsInfoItemListen (index) {
              if(index < 0) return
              const item = this.form.earningsInfoArray[index]
              if(item.rnboerInfoMtpxTpCd === '1') { // 管理员
                item.studyCollge = this.form.lglPersName
                item.selSerChanlNo = this.form.lglerCertType
                item.appSerTellerNo = this.form.lglPersCertNo
                item.certEffDt = this.form.lgrpsCertEffDt
                item.updateInsts = this.form.lglerCertDueDate
                item.telAreaNo = this.form.dmstTelAreaNo
                item.earningCertNo = this.form.lglerContTel
                item.acctChara = this.form.lglerSpecificAddr
                item.nationCode = this.form.lglerNationCode
              } else if(item.rnboerInfoMtpxTpCd === '3') { // 单位授权人
                item.studyCollge = this.form.agentPersName
                item.selSerChanlNo = this.form.agentPersCertType
                item.appSerTellerNo = this.form.agentPersCertNo
                item.certEffDt = this.form.authorCertEffDt
                item.updateInsts = this.form.agtPersCertDueDate
                item.telAreaNo = this.form.agtPersTelAreaNo
                item.earningCertNo = this.form.agentPersContTel
                item.acctChara = this.form.agentPersSpecificAddr
                item.nationCode = this.form.agentPersNationCode
              } else if (item.rnboerInfoMtpxTpCd === '2') { // 财务负责人
                item.studyCollge = this.form.finRepPersName
                item.selSerChanlNo = this.form.finRepPersCertType
                item.appSerTellerNo = this.form.finRepPersCertNo
                item.certEffDt = this.form.finoffCertEffDt
                item.updateInsts = this.form.finRepPersCertDueDate
                item.telAreaNo = this.form.finRepPersTelAreaNo
                item.earningCertNo = this.form.finRepPersContTel
                item.acctChara = this.form.finRepPersSpecificAddr
                item.nationCode = this.form.finRepPersNationCode
              } else if (item.rnboerInfoMtpxTpCd === '4') { // 经办人
                item.studyCollge = this.form.oprtorName
                item.selSerChanlNo = this.form.oprtorCertType
                item.appSerTellerNo = this.form.oprtorCertNo
                item.certEffDt = this.form.oprtorCertEffDt
                item.updateInsts = this.form.oprtorCertDueDate
                item.telAreaNo = this.form.oprtorTelAreaNo
                item.earningCertNo = this.form.oprtorMobile
                item.acctChara = this.form.oprtorContAddr
                item.nationCode = this.form.oprtorNationCode
              } else if (['5', '6', '7', '8', '9', '10', '11'].includes(item.rnboerInfoMtpxTpCd)) { // 控股股东/实际控制人
                const it = this.form.holdingInfos[item.rnboerInfoMtpxTpCd - 5]
                item.studyCollge = it.studyCollge
                item.selSerChanlNo = it.selSerChanlNo
                item.appSerTellerNo = it.addTxFlag
                item.certEffDt = it.certEffDt
                item.updateInsts = it.updateInsts
                item.telAreaNo = it.telAreaNo
                item.earningCertNo = it.appSerTellerNo
                item.acctChara = it.acctChara
                item.nationCode = it.nationCode
              } else {
                item.studyCollge = ''
                item.selSerChanlNo = ''
                item.appSerTellerNo = ''
                item.certEffDt = ''
                item.updateInsts = ''
                item.telAreaNo = ''
                item.earningCertNo = ''
                item.acctChara = ''
                item.nationCode = ''
              }
            },

            // 置空并提交 formChangeListen
            // 省 市
            emptyEmitListen (id) {
              this.form[id] = ''
              this.formChangeListen({id})
            },
            // 置空不提交
            emptyListen (id) {
              this.form[id] = ''
            },

            provinceOPtions () {
              let options = []
              options = this.selectData.PROVINCE.reduce((prev, next) => {
                if(prev.indexOf("单例市") === -1) {
                  prev.push({
                    ...next,
                    key: next.key + "0000"
                  })
                }
                return prev
              }, [])
              return options
            },
            cityOptions (provName) {
              let options = []
              if(this.form[provName]) {
                options = this.selectData.CITY.filter(it => {
                  return it.key.substring(0, 2) === this.form[provName].substring(0, 2)
                })
              }
              return options
            },
            areaCountyOptions (cityName) {
              let options = []
              if(this.form[cityName]) {
                options = this.selectData.AREA_COUNTY.filter(it => {
                  return it.key - this.form[cityName] > 0 && it.key - this.form[cityName] < 100
                })
              }
              return options
            },
            btnListen (item) {
              if(['date', 'date1'].includes(item.type)) {
                this.form[item.id] = dateObj[item.btnType] || ''
              } else if (item.type === 'cardCodeInput') {
                  if(!this.form[item.id] || !this.form[item.rulePre1]) {
                    this._$showInfo('仅当证件类型为居民身份证、临时身份证时进行联网核查且证件号码和证件姓名不能为空!')
                    return
                  }
                  this.onlineV2({
                    personCode: this.form[item.id], // 证件号码
                    customerName: this.form[item.rulePre1], // 客户姓名
                    type: item.rulePre + '1'
                  })
              }
              this.formChangeListen(item)
            },
            inputListen ({e, item}) {
              if(['telInput'].includes(item.type)) {
                this.form[item.id] = this.form[item.id].replace(/[^0-9.]+/g,'')
                return
              }
            },
            // api 联网核查
            // 联网核查结果：
            // 00 公民身份号码与姓名一致，且存在照片
            // 01 公民身份号码与姓名一致，但不存在照片
            // 02 公民身份号码存在，但与姓名不匹配
            // 03 公民身份号码不存在
            // 04 其他错误
            // 05 输入的参数错误
            // 06 公安部机构验证失败
            // 07 批量大照片
            async onlineV2 (param) {
              const params = {
                certType: '01', // 证件类型
                personCode: param.personCode, // 证件号码
                customerName: param.customerName, // 客户姓名
                dealFlag: '01', //  证件录入方式
                busiType: '01' // 业务种类
              }
              if(param.item) {
                param.item[param.type] = ''
              } else {
                this.form[param.type] = ''
              }
              try {
                const res = await this._$post(PostUrl.onlineV2, params)
                if(res.code === '0000') {
                  const resultSTA = res.resultSTA
                  if(['00', '01'].includes(resultSTA)) {
                    if(param.item) {
                      param.item[param.type] = '1'
                    } else {
                      this.form[param.type] = '1'
                    }
                    this._$showInfo('身份信息联网核查成功!')
                  } else {
                    this._$showInfo('身份信息联网核查失败!')
                  }
                } else {
                  this._$showInfo(res.msg)
                }
              } catch (error) {
                this._$showInfo(error)
              }
            },
        affiliatedCompanyArrayEdit(item,index){
          let obj = {...item}
          if(item.mainRelCorpName.indexOf("证券") > -1 || item.mainRelCorpName.indexOf("基金") > -1 || item.mainRelCorpName.indexOf("担保") > -1 || item.mainRelCorpName.indexOf("小额贷款") > -1 || item.mainRelCorpName.indexOf("典当行") > -1){
            obj.cfmFlag = '1'
          }
          else{
            obj.cfmFlag = '0'
          }
          this.infoModal = true;
          this.infoModalItem = {...obj}
          this.infoModalIndex = index
        },
        infoModalBack(item,index){
          console.log(item,'item')
          console.log(index,'index')
          this.formData.affiliatedCompanyArray[index] = {...item}
        },
        infoModalClose(){
          this.infoModal = false
        },
        }
    }
</script>

<style scoped>
  .unify_table_css{
    overflow-y: auto;
  }
  .unify_table_css table{
    width: 150%;
  }
  .dialog {
    /* position: fixed; */
    top: 300px;
    overflow: scroll;
  }
  .treeList{
    display: inline-block;
    width: 70%;
    height: 80%;
    overflow: scroll;
    text-align: left;
  }
  .white input:disabled{
    background: white;
  }

</style>
