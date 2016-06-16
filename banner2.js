/**
 * Created by thik on 2016/5/6.
 */
+function () {
    var banner = document.getElementById('banner');
    var bannerInner = document.getElementById('inner');
    var bannerTip = document.getElementById('bannerTip');
    var oLis = bannerTip.getElementsByTagName('li');
    var bannerLeft = document.getElementById('bannerLeft');
    var bannerRight = document.getElementById('bannerRight');
    var oDiv = bannerInner.getElementsByTagName('div');
    //数据绑定
    var jsonData = null;
    +function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'banner.txt?_=' + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    }();
//绑定数据
    +function () {
        //轮播图区域数据
        var str = '';
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" trueImg="' + curData['img'] + '"/></div>';
            }
        }
        bannerInner.innerHTML = str;
        utils.setCss(bannerInner, 'width', jsonData.length * 1000);
        //焦点区域数据
        str = '';
        if (jsonData) {
            for (i = 0; i < jsonData.length; i++) {
                i === 0 ? str += '<li class="bg"></li>' : str += '<li></li>';
            }
        }
        bannerTip.innerHTML = str;
    }();
//图片延迟加载
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < oDiv.length; i++) {
            +function (i) {
                var curDiv = oDiv[i];
                var curImg = curDiv.children[0];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('trueImg');
                oImg.onload = function () {
                    curImg.src = this.src;
                    if (i === 0) {
                        curDiv.style.display = 'block';
                        curDiv.style.zIndex = 1;
                        zhufengAnimate(curDiv, {opacity: 1}, 500);
                    }
                    oImg = null;
                }
            }(i);
        }
    }

//实现轮播
    var step = 0;
    var interval = 1000;
    var autoTimer = window.setInterval(autoMove, interval);

    function autoMove() {
        if (step === (jsonData.length - 1)) {
            step = -1;
        }
        step++;
        setBanner();
        changeTip();
    }
        function setBanner() {
            for (var i = 0; i < oDiv.length; i++) {
                var curDiv = oDiv[i];
                if (i !=step) {
                    utils.setCss(curDiv, 'zIndex', 0);
                } else {
                    utils.setCss(curDiv, 'zIndex', 1);
                    +function (i) {
                        zhufengAnimate(curDiv, {opacity: 1}, 500,function () {
                            for (var k = 0; k < oDiv.length; k++) {
                                if (i != k) {
                                    utils.setCss(oDiv[k], 'opacity', 0);
                                }
                            }
                        });
                    }(i);
                }
            }
        };

//实现焦点对齐
    function changeTip() {
        var temStep = step >= oLis.length ? 0 : step;
        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            i === temStep ? curLi.className = 'bg' : curLi.className = '';
        }
    }

//停止和开始自动轮播
    banner.onmouseover = function () {
        window.clearInterval(autoTimer);
        bannerLeft.style.display = 'block';
        bannerRight.style.display = 'block';
    };
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
        bannerLeft.style.display = 'none';
        bannerRight.style.display = 'none';
    };
//点击焦点实现轮播图的切换
    +function () {
        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                setBanner();
                changeTip();
            }
        }
    }();
//实现左右切换
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <= 0) {
            step = jsonData.length;
        }
        step--;
        setBanner();
        changeTip();
    };

}()