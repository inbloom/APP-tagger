$(function() {

    $( "#slideryears" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 24,
        value: 0,
        slide: function( event, ui ) {
            if (ui.value == 0){
                $( "#amountyears" ).html("Year");
            }
            else if (ui.value == 1){
                $( "#amountyears" ).html( ui.value + " year " );
            }
            else {
                $( "#amountyears" ).html( ui.value + " years " );
            }
            $( "#amountyears" ).val( ui.value );
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
            if (ui.value == 0){
                $( "#amountmonths" ).html("Month");
            }
            else if (ui.value == 1){
                $( "#amountmonths" ).html( ui.value + " month " );
            }
            else {
                $( "#amountmonths" ).html( ui.value + " months " );
            }
            $( "#amountmonths" ).val( ui.value );
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
            if (ui.value == 0){
                $( "#amountweeks" ).html("Week");
            }
            else if (ui.value == 1){
                $( "#amountweeks" ).html( ui.value + " week " );
            }
            else {
                $( "#amountweeks" ).html( ui.value + " weeks " );
            }
            $( "#amountweeks" ).val( ui.value );
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
            if (ui.value == 0){
                $( "#amountdays" ).html("Day");
            }
            else if (ui.value == 1){
                $( "#amountdays" ).html( ui.value + " day " );
            }
            else {
                $( "#amountdays" ).html( ui.value + " days " );
            }
            $( "#amountdays" ).val( ui.value );
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
            if (ui.value == 0){
                $( "#amounthours" ).html("Hour");
            }
            else if (ui.value == 1){
                $( "#amounthours" ).html( ui.value + " hour " );
            }
            else {
                $( "#amounthours" ).html( ui.value + " hours " );
            }
            $( "#amounthours" ).val( ui.value );
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
            if (ui.value == 0){
                $( "#amountminutes" ).html("Minute");
            }
            else if (ui.value == 1){
                $( "#amountminutes" ).html( ui.value + " minute " );
            }
            else {
                $( "#amountminutes" ).html( ui.value + " minutes " );
            }
            $( "#amountminutes" ).val( ui.value );
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
            if (ui.value == 0){
                $( "#amountseconds" ).html("Second");
            }
            else if (ui.value == 1){
                $( "#amountseconds" ).html( ui.value + " second " );
            }
            else {
                $( "#amountseconds" ).html( ui.value + " seconds " );
            }
            $( "#amountseconds" ).val( ui.value );
            updateTimeRequired();
        }
    });

});