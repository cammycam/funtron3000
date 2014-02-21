module('basic tests');

test("map appears", function() {
   ok( $('#map-canvas')[0], 'Map is there');
});

test("sidebar", function() {
  ok( $('.ui-panel-closed')[0], 'sidebar closed');
  $('#toggle-panel-button').click();
  ok( $('.ui-panel-open')[0], 'sidebar open');
});

test("sidebar menu populated",function() {
  ok( $('#sidebar-panel').find('li'), 'menu is populated');
});
