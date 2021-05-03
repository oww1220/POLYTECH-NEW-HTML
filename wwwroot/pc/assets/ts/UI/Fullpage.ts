import CommonUI from '../CommonUI';
//import * as Const from '../Lib/Const';
//export {};

// ---- test code ---- //
$(() => {
    const FullpagePrototype = $.fn.fullpage;
    const $fullpage = $('#fullpage');
    const $btnTop = $('.fixedLeft');
    const $header = $('.header');
    const $siteMapLayer = $('.siteMap-layer');
    const $searchLayer = $('.search-layer');
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
        $searchLayer.fadeOut();
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
        $searchLayer.fadeIn();
    }

    const siteMapLayerHandler = (e: JQuery.TriggeredEvent) => {
        //console.log($(e.currentTarget));
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
        FullpagePrototype.moveTo(1, 1);
    });

    CommonUI.slide.init('#section1 .swiper-container', 'swiper', {
        loop: true,
        pagination: {
            el: '#section1 .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 70000,
            disableOnInteraction: false,
        },
        speed: 500,
        effect: 'fade',
        pauseOnHover: false,
    });

    $siteMapLayer.find('button').on('click', siteMapLayerHandler);
});
