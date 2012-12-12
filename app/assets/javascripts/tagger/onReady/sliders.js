$(function() {

    $( "#slideryears" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 12,
        value: 0,
        slide: function( event, ui ) {
            updateSlider(event, ui, '#slideryears', 'Year');
            updateTimeRequired('Year');
        }
    });

    $( "#slidermonths" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 11,
        value: 0,
        slide: function( event, ui ) {
            updateSlider(event, ui, '#slidermonths', 'Month');
            updateTimeRequired('Month');
        }
    });

    $( "#sliderweeks" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 51,
        value: 0,
        slide: function( event, ui ) {
            updateSlider(event, ui, '#sliderweeks', 'Week');
            updateTimeRequired('Week');
        }
    });

    $( "#sliderdays" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 6,
        value: 0,
        slide: function( event, ui ) {
            updateSlider(event, ui, '#sliderdays', 'Day');
            updateTimeRequired('Day');
        }
    });

    $( "#sliderhours" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 23,
        value: 0,
        slide: function( event, ui ) {
            updateSlider(event, ui, '#sliderhours', 'Hour');
            updateTimeRequired('Hour');
        }
    });

    $( "#sliderminutes" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 59,
        value: 0,
        slide: function( event, ui ) {
            updateSlider(event, ui, '#sliderminutes', 'Minute');
            updateTimeRequired('Minute');
        }
    });

    $( "#sliderseconds" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max:59,
        value: 0,
        slide: function( event, ui ) {
            updateSlider(event, ui, '#sliderseconds', 'Second');
            updateTimeRequired('Second');
        }
    });

});

// Function to update the slider view elements without adjusting the item hash
// sliderValue is optional
function updateSlider(event, ui, sliderObj, unitString, sliderValue) {

    if (sliderValue == undefined) {
        sliderValue = ui.value;
    } else {
        $(sliderObj).slider({value:sliderValue});
    }

    var p = $(sliderObj).prev();
    if (sliderValue == 0) {
        p.html(unitString);
    } else if (sliderValue == 1) {
        p.html(sliderValue + " " + unitString);
    } else {
        p.html(sliderValue + " " + unitString + "s");
    }

}