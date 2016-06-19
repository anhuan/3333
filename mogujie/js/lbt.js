/**
 * Created by Administrator on 2016/5/22.
 */
~function () {
    var banner = document.getElementById("banner");
    var oInner = document.getElementById("inner");
    var imgList = oInner.getElementsByTagName("img");
    var oBtn = document.getElementById("btn");
    var oLis = oBtn.getElementsByTagName("li");
    var oImg = oBtn.getElementsByTagName("img");
    var leftBtn = document.getElementById("leftBtn");
    var rightBtn = document.getElementById("rightBtn");


    var jsonData = null;
    var xhr = new XMLHttpRequest();
    xhr.open("get", "data.txt?_=" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            jsonData = utils.formatJSON(xhr.responseText);
        }
    };
    xhr.send(null);
//数据绑定
    ~function () {
        var str = "";
        for (var i = 0; i < jsonData.length; i++) {
            var cur = jsonData[i];
            str += '<div><img src= "" trueSrc="' + cur.img + '"   /></div>';
        }
        oInner.innerHTML = str;

        str += '<div><img src= "" trueSrc="' + jsonData[0].img + '"   /></div>';
        oInner.innerHTML = str;
        utils.css(oInner, 'width', (jsonData.length + 1) * 715);


        str = '';
        for (j = 0; j < jsonData.length; j++) {
            if (j === 0) {
                str += '<li class="fir"><img src="images/btn.png" /></li>'
            } else {
                str += '<li><img src="images/btn.png" alt=""/></li>'
            }
        }
        oBtn.innerHTML = str;
    }();

    //实现图片延迟加载
    function imgDelay() {
        for (var i = 0; i < imgList.length; i++) {
            !function (i) {
                var curImg = imgList[i];
                if (curImg.isLoad) {
                    return;
                }
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('trueSrc');
                tempImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = 'block';
                    //处理透明度
                    animate(curImg, {opacity: 1}, 100);
                };
                curImg.isLoad = true;
            }(i);
        }
    }

    window.setTimeout(imgDelay, 100);



//4.实现自动轮播
    var interval = 3000;
    var step = 0;
    var autoTimer = window.setInterval(autoMove, interval);

    function autoMove() {
        if (step == 6) {
            step = 0;
            animate.setCss(oInner, "left", 0);
        }
        step++;
        animate(oInner, {left: step * -715}, 1000);
        changeTip()
    }

    ~function () {
        for (var i = 0; i < oLis.length; i++) {
            var oLi = oLis[i];
            oLi.index = i;
            oLi.onmouseover = function () {
                step = this.index;
                animate(oInner, {left: step * -715}, 1000);
                changeTip()
            }
        }
    }();

//实现焦点对齐
    function changeTip() {
        var temStep = step >= oImg.length ? 0 : step;
        for (var i = 0; i < oImg.length; i++) {
            var curImg = oImg[i];
            if (i == temStep) {
                curImg.style.display = "block";
            } else {
                curImg.style.display = "none";
            }
        }
    }


    banner.onmouseover = function () {
        clearInterval(autoTimer);
        leftBtn.style.display = rightBtn.style.display = "block";
    };
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, 3000);
        leftBtn.style.display = rightBtn.style.display = "none";
    };


    leftBtn.onclick = function () {
        if (step == 0) {
            step = oLis.length;
            animate.setCss(oInner, "left", step * -715);
        }
        step--;
        animate(oInner, {left: step * -715}, 1000);
        changeTip()
    }
    rightBtn.onclick = autoMove;


var zhufengEffect = {
    linear: function (t, b, c, d) {
        return t / d * c + b;
    },
    jsonParse: function (str) {
        return 'JSON'in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};
function animate(ele, obj, duration, effect, callback) {
    var fnEffect = zhufengEffect.linear;
    var oBegin = {};
    var oChange = {};

    var flag = 0;
    for (var attr in obj) {
        var target = obj[attr]
        var begin = animate.getCss(ele, attr);
        var change = target - begin;

        if (change) {
            oBegin[attr] = begin;
            oChange[attr] = change;
            flag++;
        }
    }
    if (!flag)return;
    var interval = 15;
    var times = 0;

    clearInterval(ele.timer);

    function step() {

        times += interval;
        if (times < duration) {
            for (var attr in oChange) {
                var change = oChange[attr];
                var begin = oBegin[attr];
                var val = fnEffect(times, begin, change, duration);
                animate.setCss(ele, attr, val);
            }
        } else {
            for (var attr in oChange) {
                var target = obj[attr];
                animate.setCss(ele, attr, target);
            }
            clearInterval(ele.timer);
            ele.timer = null;
            if (typeof callback == "function") {
                callback.call(ele);
            }
        }

    }

    ele.timer = setInterval(step, interval);
};


animate.getCss = function (ele, attr) {
    if (window.getComputedStyle) {
        return parseFloat(window.getComputedStyle(ele, null)[attr]);
    } else if (attr == "opacity") {
        var val = ele.currentStyle.filter;
        //"alpha(opacity=50)";
        var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
        if (reg.test(val)) {
            return RegExp.$1 / 100;
        } else {
            return 1;
        }
    } else {
        return parseFloat(ele.currentStyle[attr]);
    }
}

animate.setCss = function (ele, attr, val) {
    if (attr == "opacity") {
        ele.style.opacity = val;
        ele.style.filter = "alpha(opacity=" + val * 100 + ")";
    } else {
        ele.style[attr] = val + "px";
    }
}
}()






