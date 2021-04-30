import CommonUI from '../CommonUI';

// ---- Toggle ---- //
$(() => {
    CommonUI.event.toggle('.fixedLeft .toggle_btn', null, (logic, layer) => {
        //console.log('toggle');
        logic();
    });
});
