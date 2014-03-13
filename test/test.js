// Name of test group
module('Acceptance Tests');

// Tests that the map appears
test("Map appears", function () {
    ok($('#map-canvas').get(0));
});

// Tests that the sidebar is there, and can toggle
test("Sidebar toggles", function () {
    ok($('.ui-panel-closed').get(0));
    $('#toggle-panel-button').click();
    ok($('.ui-panel-open').get(0));
});

// Tests that there are list item in the sidebar
test("Sidebar menu populated", function () {
    ok($('#sidebar-panel').find('li'));
});

// Tests that there is an interest list
test("Interest list", function () {
    ok(0, 'there is an interest list');
});

// Tests that interests are clickable
test("Interests are clickable", function () {
    notEqual($('#interests-link').attr('href'), '#');
});

// Tests that relevent location populate the map
test("Locations populate map", function () {
    ok(0, 'map populated');
});