/**
 * Created by thik on 2016/5/6.
 */
+function () {
    var banner = document.getElementById('banner');
    var bannerInner = document.getElementById('inner');
    var bannerTip = document.getElementById('bannerTip');
    var imgList = bannerInner.getElementsByTagName('img');
    var oLis = bannerTip.getElementsByTagName('li');
    var bannerLeft = document.getElementById('bannerLeft');
    var bannerRight = document.getElementById('bannerRight');
    //数据绑定
    var jsonData = null, count = null;
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
            str += '<div><img src="" trueImg="' + jsonData[0]['img'] + '"/></div>';
        }
        bannerInner.innerHTML = str;
        count = jsonData.length + 1;
        utils.setCss(bannerInner, 'width', count * 1000);
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
    function lazyImg(curImg) {
        for (var i = 0; i < imgList.length; i++) {
            +function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('trueImg');
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = 'block';
                    oImg = null;
                    zhufengAnimate(curImg, {opacity: 1}, 300);
                }
            }(i);
        }
    }

//实现轮播
    var step = 0;
    var interval = 1000;
    var autoTimer = window.setInterval(autoMove, interval);

    function autoMove() {
        step++;
        if (step >= count) {
            bannerInner.style.left = 0;
            step = 1;
        }

        zhufengAnimate(bannerInner, {left: -step * 1000}, 500);
        changeTip();

    }

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
                changeTip();
                zhufengAnimate(bannerInner, {left: -step * 1000}, 500);
            }
        }
    }();
//实现左右切换
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <= 0) {
        step = count - 1;   //数据的长度
        utils.setCss(bannerInner, 'left', -step * 1000);
    }
    step--;
    zhufengAnimate(bannerInner, {left: -step * 1000}, 500);
    changeTip();
};

}()