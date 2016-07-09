
//->动态计算REM的换算比例
~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);
//->给滑屏区域进行初始化设置
~function () {
    var step = 0, divList = null;
    var swp = new Swiper(".swiper-container", {
        loop: true,
        direction: 'vertical',
        pagination : '.swiper-pagination',
        paginationType : 'progress',
        onTransitionEnd:function (swiper) {
            step= swiper.activeIndex;
            change();
            if (step === 0) {
                step = 5;
            }
            if (step === 6) {
                step = 1;
            }
        }
    });



    function change() {
        divList = document.querySelectorAll(".swiper-slide");
        [].forEach.call(divList, function (curDiv, index) {
            curDiv.id = index === step ? curDiv.getAttribute("trueId") : null;
            if (step === 1 || step === 6) {
                $(".myResume").addClass(" animated flipInY");
                $(".hi").addClass(" animated bounceInRight");
            } else {
                $(".myResume").removeClass("animated flipInY");
                $(".hi").removeClass("animated bounceInRight");
            }
            if (step === 2) {
                $(".inFoList>li").addClass("animated rollIn");
                $(".mouse").addClass(" animated fadeInLeft");
            } else {
                $(".inFoList>li").removeClass("animated rollIn");
                $(".mouse").removeClass("animated fadeInLeft");
            }
            if (step === 3) {
                $(".box>div:not(:nth-child(5))").addClass("animated flip");
            } else {
                $(".box>div:not(:nth-child(5))").removeClass("animated flip");
            }
            if (step === 4) {
                $(".page4>div:nth-child(1)").addClass("animated flipInY");
                $(".page4>div:nth-child(3)").addClass("animated flipInY");
                $(".page4>div:nth-child(2)").addClass("animated flipInX");
                $(".page4>div:nth-child(4)").addClass("animated flipInX");
            } else {
                $(".page4>div:nth-child(1)").removeClass("animated flipInY");
                $(".page4>div:nth-child(3)").removeClass("animated flipInY");
                $(".page4>div:nth-child(2)").removeClass("animated flipInX");
                $(".page4>div:nth-child(4)").removeClass("animated flipInX");
            }
            if (step === 5 || step === 0) {
                setTimeout(
                    function () {
                        $("#page5>ul>li:nth-child(1)").addClass(" bar1");
                        $("#page5>ul>li:nth-child(6)").addClass(" bar1");
                        $("#page5>ul>li:nth-child(2)").addClass(" bar2");
                        $("#page5>ul>li:nth-child(7)").addClass(" bar2");
                        $("#page5>ul>li:nth-child(3)").addClass(" bar3");
                        $("#page5>ul>li:nth-child(8)").addClass(" bar3");
                        $("#page5>ul>li:nth-child(4)").addClass(" bar4");
                        $("#page5>ul>li:nth-child(9)").addClass(" bar4");
                        $("#page5>ul>li:nth-child(5)").addClass(" bar5");
                        $("#page5>ul>li:nth-child(10)").addClass(" bar5");
                    }, 2000
                )
            } else {
                $(".verticalBar1>li:nth-child(1)").removeClass("bar1");
                $(".verticalBar1>li:nth-child(6)").removeClass("bar1");
                $(".verticalBar1>li:nth-child(2)").removeClass("bar2");
                $(".verticalBar1>li:nth-child(7)").removeClass("bar2");
                $(".verticalBar1>li:nth-child(3)").removeClass("bar3");
                $(".verticalBar1>li:nth-child(8)").removeClass("bar3");
                $(".verticalBar1>li:nth-child(4)").removeClass("bar4");
                $(".verticalBar1>li:nth-child(9)").removeClass("bar4");
                $(".verticalBar1>li:nth-child(5)").removeClass("bar5");
                $(".verticalBar1>li:nth-child(10)").removeClass("bar5");
            }


        });
    }

    //->给区域增加一个loop:true的时候,会自己往开头和结尾各增加一张一模一样的,但是我还需要把区域定位到“真实的第一张”,所以开始会自己向下切换一次,我们让初始的step=0即可
}();
//->音频的自动播放
~function () {
    var audioBox = document.querySelector(".audio"),
        myAudio = audioBox.getElementsByTagName("audio")[0];

    //->延时播放音频文件,先让其他的内容加载
    window.setTimeout(function () {
        myAudio.play();
        myAudio.addEventListener("canplay", function () {
            //->当音频可以播放的时候触发这个事件
            audioBox.style.display = "block";
            audioBox.className += " audioMove";
        }, false);
    }, 1000);

    //->点击音乐图标,实现音频的暂停或者播放
    audioBox.addEventListener("click", function () {
        if (myAudio.paused) {//->当前是暂停的,我让其播放
            myAudio.play();
            audioBox.className = "audio audioMove";
            return;
        }
        //->当前是播放的,我让其暂停
        myAudio.pause();
        audioBox.className = "audio";
    }, false);
}();
