// 该js中存储了一些在其他页面当中需要用到的字段，如交易类型transType
var transType;
var cardType;
var appType;
var onlyAddFlag;
var cardFace;
var personType;
var agentOrganType;
function returnCommonField(transType, cardType, appType, onlyAddFlag, cardFace,
		personType, agentOrganType) {
	this.transType = transType;
	this.cardType = cardType;
	this.appType = appType;
	this.onlyAddFlag = onlyAddFlag;
	this.cardFace = cardFace;
	this.personType = personType;
	this.agentOrganType = agentOrganType;
}

// 返回身份证读取结果
function returnIdCardInfo(obj, flag) {
	var str = eval('(' + obj + ')');
	if (flag == '1') { // 客户身份证信息
		// 判断是否是信用卡已有卡客户
		if (appType == '07') { // 信用卡已有客户，单独处理
			// 比对服务器返回的主卡信息
			var mainUserName = $("#name").val(); // 服务器返回的客户姓名和身份证号码
			var mainIdCardNum = $("#idNum").val();
			var readUserName = str.UserName; // 身份证读取器读取的客户姓名和身份证号码
			var readIdNo = str.IdNo;
			if (mainUserName != readUserName || mainIdCardNum != readIdNo) {
				alreadCardFlag = false;
				alert('身份信息不相符合，不能继续进行进件申请！');
				doJsCngPage('welcomePage');
				return;
			}
		}
		showReadIdData(str);
	} else if (flag == '2') { // 附属卡单独申请时客户身份证信息
		document.getElementById("name").value = str.UserName;
		document.getElementById("sex").value = str.Sex;
		document.getElementById("birth").value = str.BirDate;
		document.getElementById("idNum").value = str.IdNo;

		// document.getElementById("addName").readOnly = "true";
		// document.getElementById("addSex").readOnly = "true";
		// document.getElementById("addBirth").readOnly = "true";
		// document.getElementById("addId").readOnly = "true";
	} else if (flag == '3') { // 附属卡客户身份证信息
		showReadIdData(str);
	} else if (flag == '4') { // 查证接口客户身份证信息
		document.getElementById("idNum").value = str.IdNo;
	}
}


// 手机号码校验
function validate_mobiletelephone(value, returnValue) {
	var flag = true;
	var mobileExpression = /^1\d{10}$/;
	if(returnValue != ''){
	    $("#" + returnValue).html("");
	}
	if(!value){
	    if(returnValue != ''){
	        $("#" + returnValue).html("不能为空");
	    }
	    return false;
	}
	if(validateIsFullAngle(value)){
	    if(returnValue != ''){
	        $("#" + returnValue).html("不能包含全角字符");
	    }
	    return false;
	}
	if (!value.match(mobileExpression)) {
	    if(returnValue != ''){
		    $("#" + returnValue).html("请输入以1开头的11位手机号码");
	    }
		return false;
	} else {
	    var charAt1 = value.charAt(1);
	    var charAt2 = value.charAt(2);
	    if(charAt1 == '1' && charAt2 == "1"){
	        if(returnValue != ''){
        	    $("#" + returnValue).html("手机号码前三位不能一样");
	        }
	        return false;
	    }
	}
	// 手机号码相同数字字符不能大于等于10位
	if(sameNumberInPhone(value) >= 10){
      $("#" + returnValue).html("请输入正确的手机号码");
	    return false;
	}else{
        $("#" + returnValue).html("");
    }
	return true;
}

// 固话校验
function validate_phone(value, returnValue) {
	var flag = true;
	// 住宅电话校验:电话只能是7、8、11位数字，区号只能是3~4位数字，分机号只能是数字,区号、电话之间用“-”连接
	var mobileExpression = /^1\d{10}$/;
	var phoneExpression = /^0\d{2,3}-(\d{7,8})(-\d+)?$/;
//	var phoneExpression = /^0\d{2,3}-((\d{7,8})|(1\d{10}))(-\d+)?$/;
    if(returnValue != ''){
        $("#" + returnValue).html("");
    }
	if (value != undefined && value != '') {
        if(value.toUpperCase() == 'NULL'){
            if(returnValue != ""){
                $("#" + returnValue).html("不能为NULL");
            }
            return false;
        }
	    if(validateIsFullAngle(value)){
            flag = false;
            if(returnValue != ""){
                $("#" + returnValue).html("不能包含全角字符");
            }
        }
        var phoneRegular = /[a-z|0-9|-|（|）]+/g;//只允许包含这些字符
        if(!phoneRegular.test(value)){
            if(returnValue != ""){
                $("#" + returnValue).html("不能包含特殊字符");
            }
        }
        if (phoneExpression.test(value)) {//固话校验支持固话或者手机号
           var charAt1 = value.charAt(1);
           var charAt2 = value.charAt(2);
           if(charAt1 == '0' && charAt2 == "0"){
               flag = false;
               if(returnValue != ""){
                    $("#" + returnValue).html("号码前三位不能一样");
               }
           }else{
               flag = true;
               if(returnValue != ""){
                    $("#" + returnValue).html("");
               }
           }
           if(value.length >= 15){
                flag = false;
                if(returnValue != ""){
                    $("#" + returnValue).html("固定电话号码长度不能超过15位");
               }
           } else {
                flag = true;
                if(returnValue != ""){
                    $("#" + returnValue).html("");
                }
            }
           
        }else if(mobileExpression.test(value)){
            if(!validate_mobiletelephone(value,returnValue)){
                flag = false;
            }else{
                flag = true;
                if(returnValue != ""){
                    $("#" + returnValue).html("");
                }
            }
        }else{
            flag = false;
            $("#" + returnValue)
                    .html('请输入固话或者手机号码，固话需要区号与电话之间用英文\"-\"连接');
        }
    }else{
        flag = false;
        if(returnValue != ""){
            $("#" + returnValue).html("不能为空");
        }
    }
	return flag;
}

// 邮编校验
function validate_postcode(value, returnValue) {
	var flag = true;
	var postExpression = /^\d{6}$/;
	if (value != '' && !value.match(postExpression)) {
		flag = false;
		$("#" + returnValue).html("邮政编码必须为六位数字");
	} else {
		$("#" + returnValue).html("");
	}
	return flag;
}

// 校验小数点前数字位数校验
function validate_decimal(value, returnValue, n) {
	var flag = true;
	var expression = value.substring(0, value.indexOf("."));
	var expressions = /^[1-9]*[1-9][0-9]*$/;// 是否为正整数
	if (value != '' && !value.match(expressions)) {

		if (expression.length > n) {
			flag = false;
			$("#" + returnValue).html("整数不能超过" + n + "位");
		} else {
			$("#" + returnValue).html("");
		}
	} else {
		if (value.length > n) {
			flag = false;
			$("#" + returnValue).html("整数不能超过" + n + "位");
		} else {
			$("#" + returnValue).html("");
		}
	}
	return flag;
}

// 校验小数点前数字位数校验包括负数校验
function validate_decimal_fzero(value, returnValue, n) {
	var flag = true;
	var expression = value.substring(0, value.indexOf("."));
	var expressions = /^[1-9]*[1-9][0-9]*$/;// 是否为正整数
	if (value != '' && !value.match(expressions)) {
		var regex = /^\d+(\.\d+)?$/; // 非负浮点数
		if (expression.length > n) {
			flag = false;
			$("#" + returnValue).html("整数不能超过" + n + "位");
		} else if (!value.match(regex)) {
			flag = false;
			$("#" + returnValue).html("只能为大于0的数字");
		} else if (value == "0") {
			flag = false;
			$("#" + returnValue).html("只能为大于0的数字");
		} else {
			$("#" + returnValue).html("");
		}
	} else {
		if (value.length > n) {
			flag = false;
			$("#" + returnValue).html("整数不能超过" + n + "位");
		} else {
			$("#" + returnValue).html("");
		}
	}
	return flag;
}

// 最多保留两位小数
function validate_two_decimal(value, returnValue) {
	var flag = true;
	var expression = /^\d+(\.\d{1,2})?$/;
	if (value != '' && !value.match(expression)) {
		flag = false;
		$("#" + returnValue).html("最多保留两位小数");
	} else {
		$("#" + returnValue).html("");
	}
	return flag;
}

// 校验正整数
function validate_positive_integer(value, returnValue) {
	var flag = true;
	var expression = /^[1-9]*[1-9][0-9]*$/;
	if (value != '' && !value.match(expression)) {
		flag = false;
		$("#" + returnValue).html("只能为正整数");
	} else {
		$("#" + returnValue).html("");
	}
	return flag;
}

// 校验正整数包括0
function validate_positive_integer_zero(value, returnValue) {
	var flag = true;
	var expression = /^[1-9]*[1-9][0-9]*$/;
	if (value != '' && !value.match(expression)) {
		flag = false;
		$("#" + returnValue).html("只能为0或者正整数");
	} else {
		$("#" + returnValue).html("");
	}
	return flag;
}

// 日期格式
function validate_format_date(value, returnValue) {
	var flag = true;
	if (value != '' && value.length != 8) {
		flag = false;
		$("#" + returnValue).html("日期长度必须为八位，例如20090103");
	} else {
		$("#" + returnValue).html("");
	}
	return flag;
}

// 为空验证
function validate_is_null(value, returnValue) {
	var flag = true;
	if (value == '') {
		flag = false;
		$("#" + returnValue).html("该字段不能为空");
	} else {
		$("#" + returnValue).html("");
	}
	return flag;
}

// 验证省市详细地址是否为空
function validate_province_city_detail_null(province, city, detail, messageSpan) {
	var flag = true;
	if (province == "" || city == "" || detail == "") {
		flag = false;
		$("#" + messageSpan).html("地址填写不完整");
	} else {
		$("#" + messageSpan).html("");
	}
	return flag;
}

// 不包含<>《》
function specialCode(str, returnValue) {
	var reg = /^[^<>《》\x22]+$/;
	var flag = true;
	if (str != "") {
		if (reg.test(str)) {
			$("#" + returnValue).html("");
		} else {
			flag = false;
			$("#" + returnValue).html("不能带有特殊字符");
		}
	}
	return flag;
}

/**
* 地址校验 加号 减号 双引号 括号
*/
function valid_address(str, returnValue) {
    if(returnValue != ""){
        $("#" + returnValue).html("");
    }
    if(!str){
        if(returnValue != ""){
            $("#" + returnValue).html("不能为空");
        }
        return false;
    }
    if(validateIsFullAngle(str)){
        if(returnValue != ""){
            $("#" + returnValue).html("不能包含全角字符");
        }
        return false;
    }
    if(strIsAllNumber(str)){
        if(returnValue != ""){
            $("#" + returnValue).html("不能全为数字");
        }
        return false;
    }
    if(strIsAllLetter(str)){
        if(returnValue != ""){
            $("#" + returnValue).html("不能全为字母");
        }
        return false;
    }
    if(validateAllLetterNumber(str)){
        if(returnValue != ""){
            $("#" + returnValue).html("不能全为字母和数字");
        }
        return false;
    }
	var regAddress = /^[A-Z|a-z|0-9|\u4E00-\u9Fa5]+[A-Z|a-z|0-9|（|）|\(|\)|\u4E00-\u9FFF|+|\-|”|“]*$/g;
	var flagAddress = true;
    if (str.match(regAddress)) {
        if(!validateStrLength(str,12)){
            if(returnValue != ""){
                $("#" + returnValue).html("请至少输入12位字符");
            }
            return false;
        }else{
            if(returnValue != ""){
                $("#" + returnValue).html("");
            }
        }
    } else {
        if(returnValue != ""){
            $("#" + returnValue).html("请不要输入加号、减号、双引号和括号以外的特殊字符");
        }
        return false;
    }
	return flagAddress;
}

/**
* 校验姓名转拼音
*/
function validate_pinyin_name(str,spanLabelId){
    if(spanLabelId != ""){
        $("#" + spanLabelId).html("");
    }
    if(!str){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为空");
        }
        return false;
    }
    if(str.toUpperCase() == 'NULL'){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为NULL");
        }
        return false;
    }
    // var nameStrRegular = /^[A-Z|’|.|·]+[\s][A-Z|’|.|·]+$/g;//中文拼音不能为小写字母
    var nameStrRegular = /^(?!.*[ .·]$)(?!.*^[ .·][ .·])[A-Z]+[ .·][A-Z]+$/g;//中文拼音不能为小写字母
    if (str.match(nameStrRegular)) {
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("");
        }
        return true;
    } else {
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("请核实客户姓名是否准确");
        }
        return false;
    }
}

/**
* 单位名称校验 括号
*/
function valid_work_unit_name(str, returnValue) {
	var regUnitName = /^[A-Z|a-z|0-9|（|）|\(|\)|\u4E00-\u9FFF]+$/g;
	var flagUnitName = true;
	if (str!=undefined && str != "") {
		if (str.match(regUnitName)) {
			$("#" + returnValue).html("");
		} else {
			flagUnitName = false;
			$("#" + returnValue).html("请不要输入括号以外的特殊字符");
		}
	}
	return flagUnitName;
}

/**
*校验是否全是数字
*/
function strIsAllNumber(str){
    if(!str){
        return false;
    }
    return /^\d+$/.test(str)
}
/**
*校验是否全部相同数字
*/
function strIsSameNumber(str){
    if(!str){
        return false;
    }
    var sameNumRegular = /^(\d)1+$/g;
    if(str.match(sameNumRegular)){
        return true;
    }else{
        return false;
    }
}
function sameNumberInPhone(phone){
  if(!phone){
    return -1;
  }
  var data = {};
  for(var i = 0 ;  i< phone.length;i++){
    var tempChar = phone.charAt(i);
    if(data[tempChar]){
      data[tempChar] ++;
    }else{
      data[tempChar] = 1;
    }
  }
  var max = 0 ;
  var maxChar = null;
  for(var key in data){
    if(max < data[key]){
      max = data[key];
      maxChar = key;
    }
  }
  return max;
}

/**
*校验相同字符的个数
*/
function strSameCharCount(str){
    var maxCount = 0;
    var char = '';
    for(var i = 0;i < str.length;i++){
        char = str.charAt(i);
        var count = 0;
        for(var k = 0;k < str.length;k++){
            if(char == str.charAt(k)){
                count++;
            }
        }
        if(count>maxCount){
            maxCount = count;
        }
    }
    return maxCount;
}
/**
*校验是否全是字母
*/
function strIsAllLetter(str){
    if(!str){
        return false;
    }
    return /^[a-zA-Z]+$/.test(str)
}
/**
* 校验是否全是中文
*/
function validateIsAllChinese(str){
    if(!str){
        return false;
    }
    var patternChinese = /^[\u4E00-\u9Fa5]+$/g;
    if(str.match(patternChinese)){
        return true;
    }else{
        return false;
    }
}
/**
*校验户名 不能含有特殊符号 前后不能有空格 不能有全角 不能全为数字 长度为至少4个字符
*/
function validate_name(str,spanLabelId){
    if(spanLabelId != ""){
        $("#" + spanLabelId).html("");
    }
    if(!str){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为空");
        }
        return false;
    }
    if(validateContainSpace(str)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能包含空格");
        }
        return false;
    }
    if(str.toUpperCase() == 'NULL'){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为NULL");
        }
        return false;
    }
    var letterNumberRegular = /[a-z|0-9]+/g; // 允许包含大写字母（若客户姓名因生僻字录入英文，使用大写半角拼音代替）
    if (str.match(letterNumberRegular)) {
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能包含数字、字母，请确认");
        }
        return false;
    }
    if(validateIsFullAngle(str)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能包含全角字符");
        }
        return false;
    }
    if(!validateStrLength(str,4)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("长度至少为4个字符");
        }
        return false;
    }

    var nameStrRegular = /^[A-Z|a-z|\u4E00-\u9Fa5|0-9|·]+$/g;
    if (str.match(nameStrRegular)) {
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("");
        }
        return true;
    } else {
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("输入不正确，请重新输入");
        }
        return false;
    }
}
/**
* 校验包含空格
*/
function validateContainSpace(str){
	if(!str){
        return false;
    }
    var spaceRegular = /[\s]+/g;
    if (str.match(spaceRegular)) {
        return true;
    } else {
        return false;
    }
}
/**
* 校验前后空格
*/
function validateSpacePreEnd(str){
	if(!str){
        return false;
    }
    var spaceRegular = /^[\s]|[\s]$/g;
    if (str.match(spaceRegular)) {
        return true;
    } else {
        return false;
    }
}

/**
* 校验全为字母和数字
*/
function validateAllLetterNumber(str){
	if(!str){
        return false;
    }
    var letterNumberRegular = /^[A-Z|a-z|0-9]+$/g;
    if (str.match(letterNumberRegular)) {
        return true;
    } else {
        return false;
    }
}
/**
* 校验包含有数字
*/
function validateContainsNumber(str){
	if(!str){
        return false;
    }
    var letterNumberRegular = /[0-9]+/g;
    if (str.match(letterNumberRegular)) {
        return true;
    } else {
        return false;
    }
}
/**
* 校验包含有字母 数字
*/
function validateContainsLetterNumber(str){
	if(!str){
        return false;
    }
    var letterNumberRegular = /[A-Z|a-z|0-9]+/g;
    if (str.match(letterNumberRegular)) {
        return true;
    } else {
        return false;
    }
}
/**
* 户名不能包含如下字符
*/
function validate_contain_code(str){
	if(!str){
        return false;
    }
    var letterRegular = /[\?|!|\$|%|\^|\*]+/g;
    if (str.match(letterRegular)) {
        return true;
    } else {
        return false;
    }
}
/**
* 校验是否全是特殊字符：除汉字、字母、数字外即为特殊字符
*/
function validateIsAllSpecialCode(str){
	if(!str){
        return false;
    }
    var specialCodeRegular = /^[A-Z|a-z|0-9|\u4E00-\u9FFF]+$/g;
    if (!str.match(specialCodeRegular)) {
        return true;
    } else {
        return false;
    }
}

/**
* 校验是否是中文
*/
function validateIsChinese(str){
    var patternChinese = /[\u4E00-\u9Fa5]+/g;
    if(patternChinese.test(str)){
        return true;
    }else{
        return false;
    }
}

/**
* 校验是否有全角
*/
function validateIsFullAngle(str){
    var patternAngle = /[\uff00-\uffff]+/g;
    if(patternAngle.test(str)){
        return true;
    }else{
        return false;
    }
}

/**
* 字符长度 一个中文占2个字符
*/
function validateStrLength(str,expectedLength){
   var actualLength = 0;
   for(var i = 0;i<str.length;i++){
    if(str[i].match(/[\u4e00-\u9fa5]/)){
        actualLength += 2;
    } else {
        actualLength += 1;
    }
   }
    return actualLength >= expectedLength
}

/**
*去除前后空格
*/
function trimStr(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
}
/**
* 校验日期
* 证件有效期非长期时，有效期不能大于当前日期20年。
* 证件有效期30天内无法申请
*/
function validate_date(str,needValidate30Days,spanLabelId){
    if(!str){
        return false;
    }
    var expiresDay = str.replace(/-|\s/g,'');
    if(expiresDay.length != 8){
        return false;
    }
    var nowServerDate = session.getDataByKey("NowServerDate") || "";
    var nowServerDay = 0;
    if(nowServerDate == ''){
        return true;
    }
    nowServerDay = parseInt(nowServerDate);
    var flag = true;
    //先判断30内
    if(needValidate30Days && nowServerDay > 0 ){
        var thirtyDaysLater = dateAddDays(str,-30).replace(/-|\s/g,'');
        var daysLaterInt = parseInt(thirtyDaysLater);
        if(daysLaterInt >= nowServerDay){
            flag = true;
             if(spanLabelId != ""){
                $("#" + spanLabelId).html("");
             }
        }else{
            if(spanLabelId != ""){
                $("#" + spanLabelId).html("证件有效期30天内无法申请");
            }
            return false;
        }
    }
    var year = parseInt(expiresDay.slice(0,4)) - 20;
    var expiresDay20 = year + ""+ expiresDay.slice(4,8);
    var expiresDay20Int = parseInt(expiresDay20);
    if(expiresDay20Int > nowServerDay){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("有效期不能超过当前日期20年");
        }
        return false;
    }else{
        flag = true;
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("");
        }
    }
    return flag;
}
/**
* 校验证件起始日期
*/
function validate_credential_startDate(str,spanLabelId){
    if(spanLabelId != ""){
        $("#" + spanLabelId).html("");
    }
    if(!str){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为空");
        }
        return false;
    }
    if(str.toUpperCase() == 'NULL'){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为NULL");
        }
        return false;
    }
    if(validateIsFullAngle(str)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能包含全角字符");
        }
        return false;
    }
    var expiresDay = str.replace(/-|\s/g,'');
    if(expiresDay.length != 8){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("日期格式不正确");
        }
        return false;
    }

    var nowServerDate = session.getDataByKey("NowServerDate") || "";
    var nowServerDay = 0;
    if(nowServerDate == ''){
        return true;
    }
    nowServerDay = parseInt(nowServerDate);
    if(nowServerDay < expiresDay){
         if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能大于系统时间");
        }
        return false;
    }
    return true;
}
/**
* 校验证件到期日
* 证件有效期非长期时，有效期不能大于当前日期20年。
* 证件有效期30天内无法申请
*/
function validate_credential_endDate(str,spanLabelId){
    if(spanLabelId != ""){
        $("#" + spanLabelId).html("");
    }
    if(!str){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为空");
        }
        return false;
    }
    var expiresDay = str.replace(/-|\s/g,'');
    if(expiresDay.length != 8){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("日期格式不正确");
        }
        return false;
    }
    var nowServerDate = session.getDataByKey("NowServerDate") || "";
    var nowServerDay = 0;
    if(nowServerDate == ''){
        return true;
    }
    nowServerDay = parseInt(nowServerDate);
    var flag = true;
    //先判断30内
    if(nowServerDay > 0 ){
        var thirtyDaysLater = dateAddDays(str,-30).replace(/-|\s/g,'');
        var daysLaterInt = parseInt(thirtyDaysLater);
        if(daysLaterInt >= nowServerDay){
            flag = true;
            if(spanLabelId != ""){
                $("#" + spanLabelId).html("");
            }
        }else{
            if(spanLabelId != ""){
                $("#" + spanLabelId).html("证件有效期30天内无法申请");
            }
            return false;
        }
    }
    var year = parseInt(expiresDay.slice(0,4)) - 20;
    var expiresDay20 = year + ""+ expiresDay.slice(4,8);
    var expiresDay20Int = parseInt(expiresDay20);
    if(expiresDay20Int > nowServerDay){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("有效期不能超过当前日期20年");
        }
        return false;
    }else{
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("");
        }
        flag = true;
    }
    return flag;
}
/**计算证件年龄大小
*startDate 证件起始日期
* idCardNo 身份证号码
*/
function get_creditCard_age(startDate,idCardNo){//客户年龄=证件起始日期 - 身份证截取出生日期，年和年相减
    if(startDate != undefined && startDate.length == 8 && idCardNo != undefined && idCardNo.length == 18){
        var startInt = parseInt(startDate.slice(0,4));
        var cardInt = parseInt(idCardNo.slice(6,10));
        return startInt-cardInt;
    }else{
        return 0;
    }
}
/**   计算真实年龄大小 *注意区分证件年龄大小
* idCardNo 身份证号码
*/
function get_creditCard_age(idCardNo){//客户真实年龄=当前日期 - 身份证截取出生日期，年和年相减
    var nowServerDate = session.getDataByKey("NowServerDate") || "";
    console.log("current system time ："+nowServerDate +" .");
    if(nowServerDate == '' || nowServerDate.length != 8){
        console.log("current system time is empty or length not equal 8 .");
        return 0;
    }
    var nowServerDay ;
    if(nowServerDate.length == 8 ){
        nowServerDay = nowServerDate;
    }
    if(nowServerDate >0 && idCardNo != undefined && idCardNo.length == 18){
        var cardInt = parseInt(idCardNo.slice(6,10));
        var serverDay = parseInt(nowServerDay.slice(0,4));
        var birthDay = parseInt(idCardNo.slice(10,14));
        var nowDay = parseInt(nowServerDay.slice(4,8));
        var age = serverDay-cardInt;
        if(nowDay < birthDay){
            age = age - 1;
        }
        console.log("当前时间："+nowServerDay+"     证件时间："+cardInt);
        return age;
    }else{
        return 0;
    }
}
/**校验截止日期是否有效
**
*/
function validate_dateIsValid(startDateStr,endDateStr,idCardNo,spanLabelId){
    var flag = true;
    if(spanLabelId != ''){
        $("#" + spanLabelId).html("");
    }
    var startDate = startDateStr.replace(/-|\s/g,'');
    var endDate = endDateStr.replace(/-|\s/g,'');
    if(endDate.length != 8 && startDate != 8){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("日期格式不正确");
        }
        return false;
    }
    if(startDate != undefined && endDate != undefined && idCardNo != undefined && startDate.length == 8 && endDate.length == 8 && idCardNo.length == 18){
        var startInt = parseInt(startDate.slice(0,4));
        var cardInt = parseInt(idCardNo.slice(6,10));
        var endInt = parseInt(endDate.slice(0,4));
        var creditCard_age = startInt-cardInt;
        var creditCard_num = endInt-startInt;

        var birthDay = parseInt(idCardNo.slice(10,14));
        var startDay = parseInt(startDate.slice(4,8));
        console.log("age:"+creditCard_age);
        if(startDay < birthDay){
            creditCard_age = creditCard_age - 1;
        }
        if(creditCard_age < 16){//当办证时客户年龄小于16周岁时，证件到期日减去证件起始日等于5年
            if(creditCard_num != 5){
                if(spanLabelId != ''){
                    $("#" + spanLabelId).html("请核实证件信息是否正确");
                    flag = false;
                }
            }
        }else if(creditCard_age >= 16 && creditCard_age < 26){//当客户办证时年龄大于等于16周岁且小于26周岁的，证件到期日减去证件起始日等于10年
             if(creditCard_num != 10){
                 if(spanLabelId != ''){
                     $("#" + spanLabelId).html("请核实证件信息是否正确");
                     flag = false;
                 }
             }
        }else if(creditCard_age >= 26 && creditCard_age < 46){//当客户办证时年龄大于等于26周岁且小于46周岁的，证件到期日减去证件起始日等于20年
              if(creditCard_num != 20){
                  if(spanLabelId != ''){
                      $("#" + spanLabelId).html("请核实证件信息是否正确");
                      flag = false;
                  }
              }
         }
    }
    return flag;
}

/**
* 将日期 加上相应的天数  "2020-03-30",-30
*/
function dateAddDays(date,days){
    var tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + days);
    var tempMonth = tempDate.getMonth() + 1;
    if(parseInt(tempMonth) < 10){
        tempMonth = ""+"0"+tempMonth;
    }
    var tempDay = tempDate.getDate();
    if(parseInt(tempDay) < 10){
        tempDay = ""+"0"+tempDay;
    }
    return tempDate.getFullYear() + "-"+ tempMonth + "-"+tempDay;
}

/**
 * Chris
 * 当类型为“居民身份证”，“临时身份证”，“户口簿”
 * 证件的第18位（即校验位）按照标准算法校验。标准算法如下：
 * 将前17位阿拉伯数字从第一位到第十七位分别乘以系数“7，9，10，5，8，4，2，1，6，3，7，9，10，5，8，4，2”
 * 然后将相乘相加，用和除以11，当余数分别为“0，1，2，3，4，5，6，7，8，9，10”时，
 * 第18位号码（即校验位）取值分别为“1，0，X，9，8，7，6，5，4，3，2”
 * */ 

function checkIdentifyLastIsOk(str){
	// 最后一位校验位
    var idCheckRegular = ["1","0","X","9","8","7","6","5","4","3","2"];
    // 前17位 权重因子
    var idRatio = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    var totalId = 0 ;
    for(var i = 0 ; i < str.length -1 ;i++){
        var tempI = parseInt(str.charAt(i));
        totalId += tempI * idRatio[i];
    }
    var lastStr = idCheckRegular[totalId % 11 ];
    if(str.charAt(17) == lastStr){
        return true;
    }else{
        return false;
    }
}

/**
* 校验性别  可根据身份证号自动识别性别
*/

function validate_sex(IdCard){
    if(IdCard != undefined && IdCard != '' && (IdCard.length == 15 || IdCard.length == 18)){
        if(IdCard.length == 15){
            sexNo = IdCard.substring(14,15);
        }else if(IdCard.length == 18){
            sexNo = IdCard.substring(16,17);
        }
        if(sexNo%2==0){
            sex = '女';
        }else{
            sex = '男';
        }
    }
    return sex;
}

/**
* 校验证件号码 包含身份证、士兵证、护照、港澳居民通行证等证件
* str 证件号码
* cardType 证件类型：默认身份证
* spanLabelId 回显Id
*/
function validate_credential_Id(str, cardType, spanLabelId){
    if(cardType != undefined && trimStr(cardType) == ''){
        cardType = '10';//默认居民身份证
    }
    
    /**
     * 证件号码不能为空值
     * */ 
    
    if(spanLabelId != ""){
        $("#" + spanLabelId).html("");
    }
    if(!str){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为空");
        }
        return false;
    }

    /**
     * 证件号码不能为NULL
     * */ 

    if(str.toUpperCase() == 'NULL'){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能为NULL");
        }
        return false;
    }

    /**
     * 证件号码不得录入全角字符串（包含阿拉伯数字，英文字母，汉字，特殊字符）
     * */ 

    if(validateIsFullAngle(str)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能包含全角字符");
        }
        return false;
    }

    /**
     * 证件号码必须大于等于6位字符，最长为18位字符；
     * */ 

    if(!validateStrLength(str,6) && validateStrLength(str,18)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("请确认证件号码是否正确");
        }
        return false;
    }

    /**
     * 证件号码不得为全部相同或连续的阿拉伯数字，全部为英文字母，全部为汉字
     * */ 

    if(strIsSameNumber(str)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能是相同数字");
        }
        return false;
    }

    /**
     * 检验证件号码不能全部为字母
     * */
     
    if(strIsAllLetter(str)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能全为字母");
        }
        return false;
    }

    /**
     * 检验证件号码不能全部为中文
     * */ 

    if(validateIsAllChinese(str)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能全为中文");
        }
        return false;
    }

    var specialCodeRegular = /^[A-Z|a-z|\u4E00-\u9Fa5|0-9]+$/g;
    var cardTypeTotal = ['10','11','20','21','22','23','24','25','30','31','32','33','34','35','40','50','51','60','61','70','88','99'];//所有证件类型
    var cardTypeTemp = ['10','11','20','21','22','23','24','25','30','31','32','33','34','35','40','50','88'];
    if(cardTypeTotal.indexOf(cardType) == -1){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("请确认证件类型");
        }
        return false;
    }
    if ((cardTypeTemp.indexOf(cardType) > -1) && !str.match(specialCodeRegular)) {
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("不能包含特殊字符");
        }
        return false;
    }

    if(!validate_cardNoWithType(str, cardType)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("证件号码不正确，请重新输入");
        }
        return false;
    }

    if(!isValidBirthday(str, cardType)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("证件号码不正确，请重新输入");
        }
        return false;
    }

    if(!isValidBirthday1900(str, cardType)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("证件号码不正确，请重新输入");
        }
        return false;
    }

    if(!isValidProvinceCode(str, cardType)){
        if(spanLabelId != ""){
            $("#" + spanLabelId).html("证件号码不正确，请重新输入");
        }
        return false;
    }

    var cardTypeTemp1 = ['10','11','40','88'];

    /**
     * 类型为非“居民身份证”、“临时身份证”、“户口簿”、“港澳台居民居住证”、“港澳居民居住证”、“台湾居民居住证” 括号成对出现
     * */ 

    if(cardTypeTemp1.indexOf(cardType) == -1){
        if(!(((str.split('(').length-1) == (str.split(')').length-1)) && ((str.split('[').length-1) == (str.split(']').length-1)) && ((str.split('{').length-1) == (str.split('}').length-1)))){
            if(spanLabelId != ""){
                $("#" + spanLabelId).html("请确认括号格式是否正确");
            }
            return false;
        }
    }

    /**
     * 身份证最后一位校验位
     * */ 

    if(str.length == 18){
        if(checkIdentifyLastIsOk(str)){
            return true;
        }else{
            if(spanLabelId != ""){
                $("#" + spanLabelId).html("证件号码不正确，请重新输入");
            }
            return false;
        }
    }else{
        return true;
    }
}

/**
 * 身份证号码如果最后一位是x，自动返回大写X
 * */ 

function creditCardNo_xX(cardNo){
    if(!cardNo){
        return '';
    }
    var lastLetter = cardNo.charAt(cardNo.length-1);
    if(cardNo.length == 18 && lastLetter == 'x'){
        return cardNo.substring(0 , cardNo.length-1)+"X";
    }else{
        return cardNo;
    }
}

/**
 * 判断身份证前两位是否正确
 * */ 

function isValidProvinceCode(idNumber,cardType){
    switch(cardType){
        case '10'://中华人民共和国居民身份证
        var provinceCodes = ["11","12","13","14","15","21","22","23","31","32","33","34","35","36","37","41","42","43","44","45","46","50","51","52","53","54","61","62","63","64","65","71","81","82"]
        var province = idNumber.substring(0,2);
        return provinceCodes.includes(province);
    }
}

/**
 * 判断身份证号码中的月份与日期是否正确
 * */ 

function isValidBirthday(idNumber,cardType){
    switch(cardType){
        case '10'://中华人民共和国居民身份证
        var birthdayStr = idNumber.substring(6,14);
        var year = parseInt(birthdayStr.substring(0,4),10);
        var month = parseInt(birthdayStr.substring(4,6),10);
        var day = parseInt(birthdayStr.substring(6,8),10);
        var birthDay = new Date(year,month - 1,day);
    
        if(
            birthDay.getFullYear() === year && 
            birthDay.getMonth() === month - 1 && 
            birthDay.getDate() === day 
        ){
            return true
        } else {
            return false
        }
    }
}

/**
 * 判断身份证日期不能小于1900而且不能大于当前时间
 * */ 

function isValidBirthday1900(idNumber,cardType){
    switch(cardType){
        case '10'://中华人民共和国居民身份证

        var currentDate = new Date();
        var birthdayStr = idNumber.substring(6,14);
        var year = parseInt(birthdayStr.substring(0,4),10);
        var month = parseInt(birthdayStr.substring(4,6),10);
        var day = parseInt(birthdayStr.substring(6,8),10);
        var birthDay = new Date(year,month - 1,day);
  
        return (birthDay.getFullYear() >= 1900 && birthDay <= currentDate)
    }
}

/**
 * 根据证件类型校验证件号码格式是否正确
 * */ 

function validate_cardNoWithType(cardNo , cardType){
    var flag = true;
    switch(cardType){
      case '10'://中华人民共和国居民身份证
      case '11'://中华人民共和国临时身份证
      case '30'://武警身份证
      case '40'://户口簿
      case '88'://港澳台居民居住证
        if(cardNo.length != 18){
            return false;
        }
        var provinceCode = cardNo.substring(0,2);//证件号码前两位省码
        var cardNoRegular = /[11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82]/g;
        var cardNoRegular1 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g;
        if(cardNoRegular.test(provinceCode) && cardNo.match(cardNoRegular1)){
            flag = true;
        }else{
            flag = false;
        }
      break;
      case '60'://港澳居民往来内地通行证
        var cardNoRegularHK = /^H\d{8}$/;
        var cardNoRegularMK = /^M\d{18}$/;
        var startChar = cardNo.charAt(0);
        if(startChar.toUpperCase() == "H"){//香港
            if(!cardNoRegularHK.test(cardNo)){
                flag = false;
            }
        }else if(startChar.toUpperCase() == "M"){
            if(!cardNoRegularMK.test(cardNo)){
                flag = false;
            }
        }
      break;
      case '61'://台湾居民往来内地通行证
        var cardNoRegular = /^\d{8}$/;
          if(!cardNoRegular.test(cardNo)){
              flag = false;
          }
      break;
      case '21'://士兵证
      case '22'://军官证
      case '23'://文职干部证
      case '24'://军官退休证
      case '25'://文职干部退休证
      case '31'://武警士兵证
      case '32'://警官证
      case '33'://武警文职干部证
      case '34'://武警军官退休证
      case '35'://武警文职干部退休证
        var cardNoRegular = /^[\u4E00-\u9Fa5]+[\d]+['号']$/;
          if(!cardNoRegular.test(cardNo)){
              flag = false;
          }
      break;
      case '70'://外国人永久居留身份证
        var cardNoRegular = /^[A-Z{3}]+[\d]+$/;
          if(!cardNoRegular.test(cardNo)){
              flag = false;
          }
      break;
    }
    return flag;
}
//校验国籍
function validate_nation(nation,cardType){
    if(!nation){
        return false;
    }
    var cardTypeTemp = ['10','11','20','21','22','23','24','25','30','31','32','33','34','35','40','50','51','60','61','70','88'];
    if((cardTypeTemp.indexOf(cardType) > -1) && nation == '中国'){
        return true;
    }
    return false;
}
//校验职业
function validate_Jod(job,creditCardNo){
    if(!job){
        return false;
    }
    var age = get_creditCard_age(creditCardNo);
    if(age < 16){

    }
}
//校验证件类型
function validate_cardType(cardType,creditCardNo){
    if(cardType){
        return false;
    }
    var cardTypeTemp = ['10','11','20','21','22','23','24','25','30','31','32','33','34','35','40','50','51','60','61','70','88','99'];//所有证件类型
    if(cardTypeTemp.indexOf(cardType) >= 0){
        return false;
    }
    if(cardType == '10' || cardType == '11' || cardType == '40'){
        if(!validate_id(creditCardNo)){
            return false;
        }else if(validate_IdAgeOverThan16(creditCardNo) && cardType == '40'){
            //todo 当客户年龄大于等于16周岁且国籍为中国的，校验客户证件类型是否为“户口簿”。若是，则进行提示“请核实证件类型是否录入正确”，须修改客户信息后继续办理业务；
            return false;
        }
    }
    return true;
}
/**
* 校验身份证 根据身份证号码的出生日期判断年龄小于16周岁。
*/
function validate_id(str){
    if(!str){
        return false;
    }
	if(validateSpacePreEnd(str)){
		return false;
	}
    var endChar = str.charAt(str.length-1);
    if(endChar == 'x'){
        return false;
    }
    var idRegular = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    if (!idRegular.test(str)) {
        return false;
    }
    if(str.length == 18){
        if(checkIdentifyLastIsOk(str)){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    }
}
/**
*   校验年龄是否16周岁
*/
function validate_IdAgeOverThan16(str){
    if(validate_id(str)){
        if(str.length == 18){
            var nowServerDate = session.getDataByKey("NowServerDate") || "";
            console.log("current system time ："+nowServerDate +" .");
            if(nowServerDate == '' || nowServerDate.length != 8){
                console.log("current system time is empty or length not equal 8 .");
                return true;
            }
            var nowServerDay = 0;
            if(nowServerDate.length == 8 ){
                nowServerDay = parseInt(nowServerDate);
                var birthYearDay = str.slice(6,10);
                var birthYearDay16 = parseInt(birthYearDay) + 16;
                var birthDay = str.slice(10,14);
                var finalDay = parseInt(birthYearDay16+""+birthDay);
                if(nowServerDay > 0 && finalDay <= nowServerDay){
                    return true;
                }else{
                    console.log("the age is less than 16 .");
                    return false;
                }
            }else{
                console.log("current system time length less than 8 .");
                return true;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}

/**
 * 城市select下拉选择回调
 * @param value
 */
function onMainCityChanged(value, postCodeId) {
	if (checkDataValid(value)) {
		queryPostCodeByCityCode(value, postCodeId);
	}
}


/**
 * 邮编查询
 * 调用native端查询本地数据库
 * @param cityCode 城市码
 * @param id 要赋值标签的id
 */
function queryPostCodeByCityCode(cityCode, id) {
	if (checkDataValid(cityCode)) {
		var objCreateDb = {};
		var dataVersion = session.getDataByKey('DataBaseVersion');
		objCreateDb.dbName = 'creditCard.db';
		objCreateDb.dbVersion = dataVersion;
		sqliteHandle.doCreateDB(objCreateDb);

		var parmes = {};
		parmes.sql = "SELECT post FROM CAS_PAD_POST WHERE code = '" + cityCode + "' AND status = 1";
		//将id存入key字段，方便回调时取出id
		parmes.key = id;
		sqliteHandle.doRawQuery(parmes, postCodeSuccess,
			postCodeFailed);
	}
}

/**
 * 邮编查询成功
 */
function postCodeSuccess(msg) {
	//获取datas数组
	var datas = msg.datas;
	//取出查询时传入的标签id值
	var id = msg.key;
	if (checkDataValid(datas) && checkDataValid(datas.length)
	        && datas.length > 0 && checkDataValid(datas[0])) {
		var postCode = datas[0].post;
		if (checkDataValid(postCode) && postCode != "") {
			$("#" + id).val(postCode);
		} else {
			console.log("查到的邮政编码值无效");
		}
	} else {
		console.log("邮政编码查询返回数据无效");
	}
}

/**
 * 邮编查询失败
 */
function postCodeFailed(msg) {
	console.log("邮政编码查询失败");
}

/**
 * 判断数据是否有效
 */
function checkDataValid(data) {
	if (data == undefined || data == null) {
		return false;
	}
	return true;
}

/**
 * input输入框自动补全两位小数
 * @param id
 */
function autoComplete2Decimals(id) {
	$("#" + id).blur(function () {
		var curInputNum = $(this).val();
		if (!checkDataValid(curInputNum) || curInputNum == "") {
			return;
		}
		var curInputFloatNum = keepTwoDecimalFull(curInputNum);
		if (checkDataValid(curInputFloatNum)) {
			$(this).val(curInputFloatNum);
		}
	});
}

/**
 * 四舍五入保留2位小数（不够位数，则用0替补）
 */
function keepTwoDecimalFull(num) {
	var result = parseFloat(num);
	if (isNaN(result)) {
		return false;
	}
	result = Math.round(num * 100) / 100;
	var s_x = result.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}
/**
* 身份证号码 中间四位脱敏 支持二代身份证
**/
function idNumberHiddenMiddle(idNumber){
    var newIdNumber = idNumber;
    if(newIdNumber.length == 18){
        var regex = /^(.{6}).+(.{4})$/;
        newIdNumber = newIdNumber.replace(regex,"$1****$2");
    }
    return newIdNumber;
}
/**
* 手机号码中间四位脱敏
**/
function mobilePhoneHiddenMiddle(mobilePhone){
    var newPhoneNumber = mobilePhone;
    if(newPhoneNumber.length == 11){
        var regex = /^(.{3}).+(.{4})$/;
        newPhoneNumber = newPhoneNumber.replace(regex,"$1****$2");
    }
    return newPhoneNumber;
}
/** 只能输入数字:
 */
function inputTypeNumber(str) {
	return str.replace(/[^0-9]/g,'')
}

/** 只能输入T和数字 :
 */
function inputTypeNumberAndT(str) {
	return str.replace(/[^T0-9]/g,'')
}
/**
* 校验数字和字母
*/
function matchNumAndLetter(str){
    var regNumLetter = /^[0-9A-Za-z]+$/;
    if(regNumLetter.test(str)){
        return true;
    }else{
        return false;
    }
}

/**
*   校验中文姓名，包括姓名中间的·，至少2个汉字， 不包括数字 字母 符号
*1.常见的中文 \u4e00-\u9fbb  和  \u4e00-\u9fa5
*2.比较广泛的中文汉字。（包含了咱们需要的生僻字 和 不需要的很多字符 比如  中文句号分号逗号、书名号 等等）
*   \u2E80-\uFE4F
*   \u3000-\u303F	--CJK标点符号
*   \u4DC0-\u4DFF	--易经六十四卦象
*   \u2800-\u28FF	--盲文符号
*   \u3200-\u32FF	--CJK字母及月份
*   \u3300-\u33FF	--CJK特殊符号（日期合并）
*   \u2700-\u27BF	--装饰符号（非CJK专用）
*   \u2600-\u26FF	--杂项符号（非CJK专用）
*   \uFE10-\uFE1F	--中文竖排标点
*   \uFE30-\uFE4F   --CJK兼容符号
*   \u1D300-\1D35F	--太玄经符号
*/
// function regexChineseName(str){
//     var newReg = /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F.])[\u4e00-\u9fbb\u2E80-\uFE4F]+·?[\u4e00-\u9fbb\u2E80-\uFE4F]+$/;
//     var res = newReg.test(str);
//     return res;
// }

/**
 * 20240417新合规校验
 * */

function regexChineseName(str){
    var newReg = /^[\u4e00-\u9fa5]+$/;//纯汉字校验
    var newReg1 = /^[\u4e00-\u9fa5]{2,10}$/;//判断最长十个汉字字符
    var newReg2 = /^[\u4e00-\u9fa5]{1,14}·[\u4e00-\u9fa5]{1,14}$/;//判断如果包含 ∙ ，汉字最多为15个
    if(newReg.test(str) && regexStrLength(str) ===1){//判断纯单汉字字符
        showOriginalDialog("请核实客户姓名是否准确",0);
        return false;
    }else if(newReg1.test(str)){//判断最长十个汉字字符
        return true;
    }else if(newReg2.test(str)){
        var length = regexStrLength(str);
        if(length>=2 && length<=15){//判断如果包含 ∙ ，汉字最多为15个
            return true
        }else{
            showOriginalDialog("姓名不正确",0);
            return false
        }
    }
    showOriginalDialog("姓名不正确",0);
    return false
}
//计算名字长度
function regexStrLength(str){
    var len = 0;
    for(var i = 0; i < str.length ;i++){
        if(str.charAt(i) == '·'){
        }else{
            len+=1;
        }
    }
    return len;
}

/**
* 校验是否是闰年
*/
function checkIsLeapYear(year){
    if(!year){
        return false;
    }
    // 能被4整除且不能被100整除或者能被100整除且能被400整除
    if((year % 4 ==0 && year % 100 !=0)||(year % 100 ==0 && year % 400 ==0)){
        return true;
    }else{
        return false;
    }
}

/**
*   控制最高输入5位数，4位小数
*/

function floatNumCheck(num){
    var reg = /^(([1-9]{1}\d{0,4})|([0]{1}))(?:\.\d{1,4})?$/;
    return reg.test(num);
}

/**
 * Chris
 * 将输入的字母全部转化为大写
 * */ 

function converToUpperCase(id){
    var spell =  $('#'+ id ).val()
    var uplodeSpell = spell.toUpperCase()
    $('#'+ id ).val(uplodeSpell)
}

/**
 * Chris
 * 验证详细地址
 * */ 
function validateAddressDetails(id) {
	var corpHouse = $("#"+ id).val() || '';
	if (corpHouse == '') {
		showmsg("请输入详细地址");
		return false;
	}

    var lastChar = corpHouse.charAt(corpHouse.length -1);
    if(lastChar == ' '){
        showmsg("地址结尾请不要包含空格");
        return false;
    }
	if (!valid_address(corpHouse, '')) {
		showmsg("请输入正确的地址");
        return false;
	}

    if(corpHouse.length > 45 ){
        showmsg("详细地址请不要超过45位");
        return false;
    }

    if(!validateStrLength(corpHouse,12)){
            showmsg("详细地址请至少输入12位字符");
            $("#" + returnValue).html("详细地址请至少输入12位字符");
        return false;
    }

    if(!validateLetterCount(corpHouse)){
        showOriginalDialog("详细地址中包含的字母必须少于10个",0);
        return false
    }
    
	return true;
}

	/**
	 * Chris
	 * 20240327
	 * 详细地址校验，判断详细地址中字母不能多于10个
	 * */ 

function validateLetterCount(str){
    var letterCount = 0;
    for(var i = 0;i<str.length;i++){
        if(/[a-zA-Z]/.test(str[i])){
            letterCount++;
        }
    }
    return letterCount<10;
}

/**
 * Chris
 * 获取角色权限是否含有网点综合权限
 * */ 

function getPermissions(){
    var str = session.getDataByKey('tellerRoleSet');
    var tarage = '258';
    var Permissions = str.split('|');
    if(Permissions.includes(tarage)){
        return true
    } else {
        return false
    }
}

/**
 * 存储session的方法。
 * */ 

function setSession(sessionname,sessionvalue){      
    if (session.hasKey(sessionname)) {
        session.removeData([sessionname]);
    }
    session.addDataByKeyValue(sessionname,sessionvalue);
}


function validatePhoneNumberRealTime(value,spanId){
	var mobileExpression = /^1\d{10}$/;
	if(spanId != ''){
	    $("#" + spanId).html("");
	}
	if(!value){
	    if(spanId != ''){
	        $("#" + spanId).html("不能为空");
	    }
        return ;
	}
	if(validateIsFullAngle(value)){
	    if(spanId != ''){
	        $("#" + spanId).html("不能包含全角字符");
	    }
	    return ;
	}
	if (!value.match(mobileExpression)) {
	    if(spanId != ''){
		    $("#" + spanId).html("请输入以1开头的11位手机号码");
	    }
		return;
	} else {
	    var charAt1 = value.charAt(1);
	    var charAt2 = value.charAt(2);
	    if(charAt1 == '1' && charAt2 == "1"){
	        if(spanId != ''){
        	    $("#" + spanId).html("手机号码前三位不能一样");
	        }
	        return;
	    }
	}
	// 手机号码相同数字字符不能大于等于10位
	if(sameNumberInPhone(value) >= 10){
      $("#" + spanId).html("请输入正确的手机号码");
	    return;
	}else{
        $("#" + spanId).html("");
    }
	return;
}

/**
 * Chris
 * 根据身份证确定年龄
 * */ 
function getAgeFromIDCard1660(value){
    var idNum =  value;
    var birthday = idNum.substring(6,14);
    var birthYear = parseInt(birthday.substring(0,4),10);
    var birthMonth = parseInt(birthday.substring(4,6),10);
    var birthDay = parseInt(birthday.substring(6,8),10);
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    var currentDay = today.getDate();

    var age = currentYear - birthYear;
    if(currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)){
        age--;
    }
    var sex = parseInt(idNum.charAt(16),10) % 2 === 0 ? '女':'男';
    if((age >= 16 && age <= 55 && sex === '女') || (age >= 16 && age <= 60 && sex === '男')){
        return true
    } else {
        return false
    }
}

function getAgeFromIDCard60(value){
    var idNum =  value;
    var birthday = idNum.substring(6,14);
    var birthYear = parseInt(birthday.substring(0,4),10);
    var birthMonth = parseInt(birthday.substring(4,6),10);
    var birthDay = parseInt(birthday.substring(6,8),10);
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    var currentDay = today.getDate();

    var age = currentYear - birthYear;
    if(currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)){
        age--;
    }
    var sex = parseInt(idNum.charAt(16),10) % 2 === 0 ? '女':'男';
    if((age > 55 && sex === '女') || (age > 60  && sex === '男')){
        return true
    } else {
        return false
    }
}

function getAgeFromIDCard70(value){
    var idNum =  value;
    var birthday = idNum.substring(6,14);
    var birthYear = parseInt(birthday.substring(0,4),10);
    var birthMonth = parseInt(birthday.substring(4,6),10);
    var birthDay = parseInt(birthday.substring(6,8),10);
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    var currentDay = today.getDate();

    var age = currentYear - birthYear;
    if(currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)){
        age--;
    }
    if((age > 70 )){
        return true
    } else {
        return false
    }
}

function compareAccounts(){
    var prmterTellerNo =  session.getDataByKey('prmterTellerNo') || ""
    var option = {
		title : "推广人员授权确认",
		ok : parseInt("0001", 2),
        inputType:"number",
		onOk : function(value) { 
            if(value == prmterTellerNo){
                session.addDataByKeyValue("AuthorizationFlag",'true');
            } else {
                window.wxc.xcConfirm("柜员号与当前登录柜员不一致，请确认！","error")
                session.addDataByKeyValue("AuthorizationFlag",'false');
            }
        }
	}
	window.wxc.xcConfirm("推广人员账号：","input",option)
}