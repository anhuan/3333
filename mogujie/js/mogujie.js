/**
 * Created by Administrator on 2016/5/20.
 */
//上侧隐藏搜索框


//headerT部分
var headerT = document.getElementById("headerT");
var hover=utils.getElementsByClass("hover",headerT);
var OBox = utils.getElementsByClass("box",headerT);
for (var i = 0; i < hover.length; i++) {
    var cur = hover[i];
    cur.index = i;
    cur.onmouseover = function () {
        OBox[this.index].style.display = "block";
    };
    cur.onmouseout = function () {
        OBox[this.index].style.display = "none";
    }
}


//右侧导航栏+上侧搜索栏
~function () {
    var goLink = document.getElementById("goLink");
    var oSearch = document.getElementById("search");
    var searchBox2 = document.getElementById("searchBox");
    searchBox2.onmouseover = function () {
        utils.lastChild(this).style.display = "block";
    };

    searchBox2.onmouseover = function () {
        utils.lastChild(this).style.display = "none";
    };


    window.onscroll = computedDisplay;
    function computedDisplay() {
            var curTop = document.documentElement.scrollTop || document.body.scrollTop;
            var curHeight = document.documentElement.clientHeight || document.body.clientHeight;
            oSearch.style.display = curTop > curHeight ? "block" : "none";
            goLink.style.display = curTop > curHeight ? "block" : "none";

            goLink.onclick = function () {
                var duration = 500, interval = 10, target = document.documentElement.scrollTop || document.body.scrollTop;
                var step = (target / duration) * interval;
                var timer = window.setInterval(function () {
                    var curTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (curTop === 0) {
                        window.clearInterval(timer);
                        return;
                    }
                    curTop = curTop - step;
                    document.documentElement.scrollTop = curTop;
                    document.body.scrollTop = curTop;
                }, interval);
            };
    }
    var rightNav = document.getElementById("rightNav");
    var p = rightNav.getElementsByTagName("p");

    for (var i = 0; i < p.length; i++) {
        var curP = p[i];
        curP.onmouseover = function () {
            var prev = utils.prev(this);
            if (prev) {
                utils.firstChild(this).style.borderBottomColor = "red";
                utils.firstChild(utils.prev(this)).style.borderBottomColor = "#000";
            } else {
                utils.firstChild(this).style.borderBottomColor = "red";
            }
        };
        curP.onmouseout = function () {
            var prev = utils.prev(this);
            if (prev) {
                utils.firstChild(this).style.borderBottomColor = "#fff";
                utils.firstChild(utils.prev(this)).style.borderBottomColor = "#fff";
            } else {

            }
            utils.firstChild(this).style.borderBottomColor = "#fff";
        }

    }
}();



//左侧导航
~function () {
    var ulList = document.getElementById("ulList");
    var navLi = ulList.getElementsByTagName("li");
    var oUl = ulList.parentNode;

    for (var j = 0; j < navLi.length; j++) {
        var cur = navLi[j];
        cur.self = j;
        cur.onmouseover = function () {
            var prev = utils.prev(this);
            utils.lastChild(this).style.display = "block";
            utils.firstChild(this).style.borderBottomColor = "#fff";
            this.style.borderBottomColor = "#ccc";
            oUl.style.borderRightColor = "#ccc";

            if (prev) {
                utils.firstChild(prev).style.borderBottomColor = "#fff";
                prev.style.borderBottomColor = "#ccc";
            }
        };
        cur.onmouseout = function () {
            var prev = utils.prev(this);
            utils.lastChild(this).style.display = "none";
            utils.firstChild(this).style.borderBottomColor = "#ccc";
            this.style.borderBottomColor = "fff";
            oUl.style.borderRightColor = "red";
            if (prev) {
                prev.style.borderBottomColor = "#fff";
                this.style.borderBottomColor = "#fff";
            }
        }
    }
}();


//限时抢购
~function(){
    function getRTime(){
        var EndTime= new Date('2016/7/26 00:00:00'); //截止时间
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();
        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);


        document.getElementById("timeH").innerHTML = h ;
        document.getElementById("timeM").innerHTML = m  ;
        document.getElementById("timeS").innerHTML = s ;
        setInterval(getRTime,1000);
    }
    getRTime();
}()





//搜索框

var searchBox = document.getElementById("searchBox");
var searchBox2 = document.getElementById("searchBox2");
var shop = document.getElementById("shop");
var shop2 = document.getElementById("shop2");
searchBox.onmouseover = function () {
    shop.style.display = "block";
};
searchBox2.onmouseover = function () {
    shop2.style.display = "block";
};
searchBox.onmouseout = function () {
    shop.style.display = "none";
};
searchBox2.onmouseout = function () {
    shop2.style.display = "none";
};

var searchList = document.getElementsByName("searchList");

for (var i = 0; i < searchList.length; i++) {
    var cur = searchList[i];
    cur.self = i;
    var prev = cur.parentNode;
    var record = utils.next(prev);
    cur.onfocus = function () {
        if (this.value == this.defaultValue) {
        }
        this.value = "";
    }
    document.body.onclick = function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        if (e.target.id === "searchBox" || e.target.tagName.toLocaleLowerCase() === "input") {
            if (record.style.display === "none") {
                record.style.display = "block";
            } else {
                record.style.display = "none";
            }
            return;
        }
        if (e.target.className === "note") {
            return;
        }
        record.style.display = "none";
    };
}










