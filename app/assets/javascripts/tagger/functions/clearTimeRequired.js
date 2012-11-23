
function clearTimeRequired() {

    // Clear the visible values
    $( "#slideryears" ).slider({value:0});
    $( "#slidermonths" ).slider({value:0});
    $( "#sliderweeks" ).slider({value:0});
    $( "#sliderdays" ).slider({value:0});
    $( "#sliderhours" ).slider({value:0});
    $( "#sliderminutes" ).slider({value:0});
    $( "#sliderseconds" ).slider({value:0});

    // Clear the visible values
    $( "#amountyears" ).html("Year");
    $( "#amountmonths" ).html("Month");
    $( "#amountweeks" ).html("Week");
    $( "#amountdays" ).html("Day");
    $( "#amounthours" ).html("Hour");
    $( "#amountminutes" ).html("Minute");
    $( "#amountseconds" ).html("Second");

}