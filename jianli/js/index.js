//->动态计算REM的换算比例
~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);
/**
 * Created by Administrator on 2016/6/13.
 */

//->给滑屏区域进行初始化设置
~function () {
    var step = 0, divList = null;
    var swp = new Swiper(".swiper-container", {
        loop: true,
        direction: 'vertical',
        onSlidePrevEnd: function () {//向上滑 索引--
            step--;
            change();
            if (step === 0) {//将第二张增加到第一张上面时的索引
                step = 8;//真实的索引
            }
        },
        onSlideNextEnd: function () {//向下滑 索引++
            step++;
            change();
            if (step === 9) {//将第一张增加到第二张的后面时的索引
                step = 1;//真实的索引
            }
        }
    });


    function change() {
        divList = document.querySelectorAll(".swiper-slide");
        [].forEach.call(divList, function (curDiv, index) {
            curDiv.id = index === step ? curDiv.getAttribute("trueId") : null;
        });
    }

    //->给区域增加一个loop:true的时候,会自己往开头和结尾各增加一张一模一样的,但是我还需要把区域定位到“真实的第一张”,所以开始会自己向下切换一次,我们让初始的step=0即可
}();



