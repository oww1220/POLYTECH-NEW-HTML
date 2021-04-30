import CommonUI from '../CommonUI';
//import * as Const from '../Lib/Const';
//export {};

// ---- test code ---- //
$(() => {
    const $fullpage = $('#fullpage');
    const $btnTop = $('.fixedLeft');
    const $header = $('.header');
    const $siteMapLayer = $('.siteMap-layer');
    const $scrollDown = $('.scroll-down');
    const fullpageOptions = {
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        lazyLoad: true,
        autoScrolling: true,
        navigation: true,
        navigationPosition: 'right',
        //navigationTooltips: ['INTRO', 'HIT소식', 'WHY HIT', 'HIT 생활', 'HIT SNS'],
        responsiveWidth: 1200,
        afterLoad() {
            $('.fp-table.active').addClass('loaded');
        },
        onLeave(index: number, nextIndex: number, direction: string) {
            if (nextIndex === 1) {
                $header.fadeIn();
                $btnTop.removeClass('active');
            } else {
                $header.fadeOut();
                $btnTop.addClass('active');
            }
        },
    };
    const openCallback_1: PromiseCallback = (resolve, reject) => {
        setTimeout(() => {
            $scrollDown.hide();
            resolve(true);
        }, 700);
    };
    const openCallback_2: PromiseCallback = (resolve, reject) => {
        setTimeout(() => {
            $siteMapLayer.addClass('open');
            resolve(true);
        }, 300);
    };
    function* openGenerator() {
        $siteMapLayer.addClass('top');
        yield CommonUI.async.promise(openCallback_1);
        yield CommonUI.async.promise(openCallback_2);
    }
    const closeCallback_1: PromiseCallback = (resolve, reject) => {
        setTimeout(() => {
            $siteMapLayer.removeClass('top');
            resolve(true);
        }, 700);
    };
    const closeCallback_2: PromiseCallback = (resolve, reject) => {
        setTimeout(() => {
            $scrollDown.show();
            resolve(true);
        }, 300);
    };
    function* closeGenerator() {
        $siteMapLayer.removeClass('open');
        yield CommonUI.async.promise(closeCallback_1);
        yield CommonUI.async.promise(closeCallback_2);
    }

    const siteMapLayerHandler = (e: Event) => {
        //console.log($(e.currentTarget!));
        CommonUI.async.generaterRun(function* () {
            if ($siteMapLayer.hasClass('open')) {
                yield* closeGenerator();
            } else {
                yield* openGenerator();
            }
        });
    };

    $fullpage.fullpage(fullpageOptions);

    $btnTop.find('.btn-goTop').on('click', () => {
        $.fn.fullpage.moveTo(1, 1);
    });

    CommonUI.slide.init('#section1 .swiper-container', 'swiper', {
        loop: true,
        pagination: {
            el: '#section1 .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 16000,
            disableOnInteraction: false,
        },
        speed: 500,
        effect: 'fade',
        pauseOnHover: false,
    });

    $siteMapLayer.find('button').on('click', siteMapLayerHandler);

    //ie test es6 method!
    /*
    console.log('TOUCH_EVENT', Const.TOUCH_EVENT);

    const aaa = new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    }).then((result) => {
        console.log(result + 1); // 1
        return result;
    });

    const bb = {
        as: 1,
        cs: 3,
    };

    const { as, cs } = bb;

    const ddd = Object.assign({ as }, { cs });
    console.log(ddd);
    console.log(ddd);
    console.log(ddd);

    //비동기 함수들 --> 동기적으로 실행 예시!!
    const promiseCallback: PromiseCallback = (resolve, reject) => {
        $('.col:first-child h2').animate({ 'margin-left': 100 }, 5000, () => {
            resolve(true);
        });
    };
    const promiseCallback2: PromiseCallback = (resolve, reject) => {
        $('.col:first-child h2').animate({ 'margin-left': 0 }, 5000, () => {
            resolve(true);
        });
    };
    CommonUI.async.generaterRun(function* () {
        console.log('!!!!!!!!!!!!start');

        const delay1 = yield CommonUI.async.wait(2000, 'delay2초');
        console.log(delay1);

        const runVal11 = yield CommonUI.async.promise(promiseCallback);
        console.log(runVal11);

        const runVal2 = yield 'test2';
        console.log(runVal2);

        const delay2 = yield CommonUI.async.wait(3000, 'delay3초');
        console.log(delay2);

        const runVal22 = yield CommonUI.async.promise(promiseCallback2);
        console.log(runVal22);

        console.log('end!!!!!!!!!!!!');
    });

    */
});
