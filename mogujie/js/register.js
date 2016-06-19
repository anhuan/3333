/**
 * Created by Administrator on 2016/5/31.
 */


var tell = document.getElementById("tell");
var errorTips = document.getElementById("errorTips");
tell.onfocus = function () {
    if (this.value == this.defaultValue) {
    }
    this.value = "";
};
tell.onblur = function () {
    var reg = /^\s*$/;
    if (reg.test(this.value)) {
        this.value = this.defaultValue;
    }
};
var regSpace = /\s+/g;
tell.value = tell.value.replace(regSpace, "");
tell.onkeyup = function () {
    console.log(tell.value);
    var reg = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
    if (!(reg.test(tell.value))) {
        //console.log("电话匹配失败！");
        errorTips.style.display = "block";
        errorTips.innerHTML = "请输入正确的手机号";
        if (tell.value == "") {
            // console.log("请输入手机号");
            errorTips.innerHTML = "请输入手机号";
        }
    } else {
        //console.log("ok");
        errorTips.style.display = "none";
    }
};

var getCode = document.getElementById("getCode");
var hidden = document.getElementById("hidden");
var oLis = hidden.getElementsByTagName("li");
getCode.onfocus = function () {
    hidden.style.display = "block";
    for (var i = 0; i < oLis.length; i++) {
        var curLi = oLis[i];
        curLi.index = i;
        curLi.onclick = function () {
            var temp = utils.css(this, "backgroundPositionY");
            temp += 75;
            console.log(temp);
            this.style.backgroundPositionY = temp + "px";
        }
    }
};
 /*
 var button = document.getElementById("button");
 button.onclick = function () {
 errorTips.style.display = "block";
 errorTips.innerHTML = "请输入手机号";
 console.log("zzzz");
 }
 */




