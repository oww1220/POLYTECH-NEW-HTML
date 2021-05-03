import CommonUI from '../CommonUI';
import * as Const from '../Lib/Const';

// ---- LayerPop ---- //
$(() => {
    const FullpagePrototype = $.fn.fullpage;
    const $fullpage = $('#fullpage');
    const layerSauce = `
    <div class="pop_layer layer-common">
        <div class="pop_inner">
            <div class="pop_scroll">

                <div class="pop_cont">

                    <div class="hasmap-wrap step step1 ">
                        <img src="../assets/images/search-layer1.png" alt="">
                        <button class="step2-open" type="button" style="width: 70px;height: 340px;top:420px;left: 200px;">열기</button>
                    </div>
                    <div class="hasmap-wrap step step2">
                        <img src="../assets/images/search-layer2.png" alt="">
                        <button class="step3-open" type="button" style="width: 140px;height: 340px;top:420px;left: 382px;">열기</button>
                    </div>
                    <div class="hasmap-wrap step step3">
                        <img src="../assets/images/search-layer3.png" alt="">
                        <button class="step4-open" type="button" style="width: 140px;height: 340px;top:420px;left: 555px;">열기</button>
                    </div>
                    <div class="hasmap-wrap step step4">
                        <img src="../assets/images/search-layer4.png" alt="">
                    </div>
                    
                    
                </div>
                <button type="button" class="layer_close_bt" id="layer_close1" data-layer="layer-common">닫기</button>	
                
            </div>
        </div>
    </div>
    <div class="layer_dimmed">레이어 배경</div>
    `;
    const depthChangeEvent = (handleFlag: boolean) => {
        const target = '.layer-common .pop_cont';
        if (handleFlag) {
            $(document).on(`click.${depthChangeEvent.name}`, target, (e) => {
                //console.log(e.target);
                if ($(e.target).hasClass('step2-open')) {
                    $('.step').hide();
                    $('.step2').show();
                } else if ($(e.target).hasClass('step3-open')) {
                    $('.step').hide();
                    $('.step3').show();
                } else if ($(e.target).hasClass('step4-open')) {
                    $('.step').hide();
                    $('.step4').show();
                }
            });
        } else {
            $('.step').hide();
            $('.step1').show();
            $(document).off(`click.${depthChangeEvent.name}`);
        }
    };

    $('body').append(layerSauce);

    /*열기 이벤트------*/
    $(document).on('click', '#layer_open1', function () {
        CommonUI.layer.open('.layer-common', Const.LAYER_DIM, Const.LAYER_PARENT, () => {
            console.log('open');
            if ($fullpage.length) FullpagePrototype.setAllowScrolling(false);
            depthChangeEvent(true);
        });
    });

    /*닫기 이벤트------*/
    $(document).on('click', '#layer_close1', function () {
        CommonUI.layer.close('.layer-common', Const.LAYER_DIM, Const.LAYER_PARENT, function () {
            console.log('close');
            if ($fullpage.length) FullpagePrototype.setAllowScrolling(true);
            depthChangeEvent(false);
        });
    });
    $(Const.LAYER_DIM).on('click', function (e) {
        CommonUI.layer.close(Const.LAYER_DIM, Const.LAYER_DIM, Const.LAYER_PARENT, () => {
            console.log('close');
            if ($fullpage.length) FullpagePrototype.setAllowScrolling(true);
            depthChangeEvent(false);
        });
    });
});
