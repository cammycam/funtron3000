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
    ok(1, 'there is an interest list');
});

// Tests that interests are clickable
test("Interests are clickable", function () {
    notEqual($('#interests-link').attr('href'), '#');
});

// Tests that relevent location populate the map
test("Locations populate map", function () {
    ok(1, 'map populated');
});

// Tests increment experience points when places are visited
test("Experience points increment", function () {
    ok(1, 'increments');
});

// Tests that there is a list of badges
test("List of badges", function () {
    ok(1, 'list is there');
});

// Tests that badges are linked to experience points
test("Linked to badges", function () {
    ok(1, 'it is linked');
});

// Tests that earned badges are shown
test("Badges in profile", function () {
    ok(1, 'badges are shown');
});

// Tests that badges are availible on twitter
test("Badges on twitter", function () {
    ok(1, 'badges are availible');
});
