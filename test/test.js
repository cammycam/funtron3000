# Name of test group
module('basic tests');

# Tests that the map appears
test("map appears", function () {
    ok($('.gm-style').get(0), 'Map is there');
});

# Tests that the sidebar is there, and can toggle
test("sidebar", function () {
    ok($('.ui-panel-closed').get(0), 'sidebar closed');
    $('#toggle-panel-button').click();
    ok($('.ui-panel-open').get(0), 'sidebar open');
});

# Tests that there are list item in the sidebar
test("sidebar menu populated", function () {
    ok($('#sidebar-panel').find('li'), 'menu is populated');
});

# Tests that there is an interest list
test("interest list", function () {
  ok( 0==1);
});

# Tests that interests are clickable
test("interests clickable",function (){
   ok(0==1);
});

# Tests that relevent location populate the map
test("locations populate map", function () {
   ok(0==1);
});
