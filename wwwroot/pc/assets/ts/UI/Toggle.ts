import CommonUI from '../CommonUI';

// ---- Toggle ---- //
$(() => {
    CommonUI.event.toggle('.fixedLeft .toggle_btn', null, (logic, layer) => {
        //console.log('toggle');
        logic();
    });

    $('.campus #section3 .step1 button').on('click', () => {
        $('.step1').hide();
        $('.step2').show();
    });
    $('.campus #section3 .step2 button').on('click', () => {
        $('.step2').hide();
        $('.step1').show();
    });
});
