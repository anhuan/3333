//->��̬����REM�Ļ������
~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);
/**
 * Created by Administrator on 2016/6/13.
 */

//->������������г�ʼ������
~function () {
    var step = 0, divList = null;
    var swp = new Swiper(".swiper-container", {
        loop: true,
        direction: 'vertical',
        onSlidePrevEnd: function () {//���ϻ� ����--
            step--;
            change();
            if (step === 0) {//���ڶ������ӵ���һ������ʱ������
                step = 8;//��ʵ������
            }
        },
        onSlideNextEnd: function () {//���»� ����++
            step++;
            change();
            if (step === 9) {//����һ�����ӵ��ڶ��ŵĺ���ʱ������
                step = 1;//��ʵ������
            }
        }
    });


    function change() {
        divList = document.querySelectorAll(".swiper-slide");
        [].forEach.call(divList, function (curDiv, index) {
            curDiv.id = index === step ? curDiv.getAttribute("trueId") : null;
        });
    }

    //->����������һ��loop:true��ʱ��,���Լ�����ͷ�ͽ�β������һ��һģһ����,�����һ���Ҫ������λ������ʵ�ĵ�һ�š�,���Կ�ʼ���Լ������л�һ��,�����ó�ʼ��step=0����
}();



