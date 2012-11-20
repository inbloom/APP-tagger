$(function() {

    $( "#slideryears" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 24,
        value: 0,
        slide: function( event, ui ) {
            var p = $(ui.handle).parent().prev();
            if (ui.value == 0) p.html("Year");
            else if (ui.value == 1) p.html( ui.value + " year " );
            else p.html( ui.value + " years " );
        },
        change: function () {
            updateTimeRequired();
        }
    });

    $( "#slidermonths" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 11,
        value: 0,
        slide: function( event, ui ) {
            var p = $(ui.handle).parent().prev();
            if (ui.value == 0) p.html("Month");
            else if (ui.value == 1) p.html( ui.value + " month " );
            else p.html( ui.value + " months " );
        },
        change: function () {
            updateTimeRequired();
        }
    });

    $( "#sliderweeks" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 51,
        value: 0,
        slide: function( event, ui ) {
            var p = $(ui.handle).parent().prev();
            if (ui.value == 0) p.html("Week");
            else if (ui.value == 1) p.html( ui.value + " week " );
            else p.html( ui.value + " weeks " );
        },
        change: function () {
            updateTimeRequired();
        }
    });

    $( "#sliderdays" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 30,
        value: 0,
        slide: function( event, ui ) {
            var p = $(ui.handle).parent().prev();
            if (ui.value == 0) p.html("Day");
            else if (ui.value == 1) p.html( ui.value + " day " );
            else p.html( ui.value + " days " );
        },
        change: function () {
            updateTimeRequired();
        }
    });

    $( "#sliderhours" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 23,
        value: 0,
        slide: function( event, ui ) {
            var p = $(ui.handle).parent().prev();
            if (ui.value == 0) p.html("Hour");
            else if (ui.value == 1) p.html( ui.value + " hour " );
            else p.html( ui.value + " hours " );
        },
        change: function () {
            updateTimeRequired();
        }
    });

    $( "#sliderminutes" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 59,
        value: 0,
        slide: function( event, ui ) {
            var p = $(ui.handle).parent().prev();
            if (ui.value == 0) p.html("Minute");
            else if (ui.value == 1) p.html( ui.value + " minute " );
            else p.html( ui.value + " minutes " );
        },
        change: function () {
            updateTimeRequired();
        }
    });

    $( "#sliderseconds" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max:59,
        value: 0,
        slide: function( event, ui ) {
            var p = $(ui.handle).parent().prev();
            if (ui.value == 0) p.html("Second");
            else if (ui.value == 1) p.html( ui.value + " second " );
            else p.html( ui.value + " seconds " );
        },
        change: function () {
            updateTimeRequired();
        }
    });

});