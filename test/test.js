module('basic tests');

test("map appears", function () {
    ok($('#map-canvas').get(0), 'Map is there');
});

test("sidebar", function () {
    ok($('.ui-panel-closed').get(0), 'sidebar closed');
    $('#toggle-panel-button').click();
    ok($('.ui-panel-open').get(0), 'sidebar open');
});

test("sidebar menu populated", function () {
    ok($('#sidebar-panel').find('li'), 'menu is populated');
});
