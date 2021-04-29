import CommonUI from '../CommonUI';
import * as Const from '../Lib/Const';

// ---- test code ---- //
$(() => {
    const fullpageOptions = {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        lazyLoad: true,
        autoScrolling: true,
        navigation: true,
        navigationPosition: 'left',
        //navigationTooltips: ['INTRO', 'HIT소식', 'WHY HIT', 'HIT 생활', 'HIT SNS'],
        responsiveWidth: 1200,
        afterLoad: function () {
            $('.fp-table.active').addClass('focus');
            $('.fp-table.active').addClass('loaded');
        },
    };

    const fullpageInstance = new fullpage('#fullpage', fullpageOptions);

    //ie test es6 method!

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

    //(Array.prototype as any).mapToNumbers = function () {
    ///* ... */
    //};
});
