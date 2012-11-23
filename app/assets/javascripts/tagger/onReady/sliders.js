$(function() {

    $( "#slideryears" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 24,
        value: 0,
        slide: function( event, ui ) {
            updateSlider('#slideryears', 'Year');
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
            updateSlider('#slidermonths', 'Month');
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
            updateSlider('#sliderweeks', 'Week');
            updateTimeRequired('Week');
        }
    });

    $( "#sliderdays" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 30,
        value: 0,
        slide: function( event, ui ) {
            updateSlider('#sliderdays', 'Day');
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
            updateSlider('#sliderhours', 'Hour');
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
            updateSlider('#sliderminutes', 'Minute');
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
            updateSlider('#sliderseconds', 'Second');
            updateTimeRequired('Second');
        }
    });

});

// Function to update the slider view elements without adjusting the item hash
// sliderValue is optional
function updateSlider(sliderObj, unitString, sliderValue) {

    if (sliderValue == undefined) {
        sliderValue = $(sliderObj).slider('value');
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