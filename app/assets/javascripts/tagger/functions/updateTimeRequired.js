
function updateTimeRequired(){

    var objName = "timeRequired"

    $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {

        items[obj.id][objName] = "P" +
            $( "#slideryears" ).slider("value") + "Y" +
            $( "#slidermonths" ).slider("value") + "M" +
            $( "#sliderweeks" ).slider("value") + "W" +
            $( "#sliderdays" ).slider("value") + "DT" +
            $( "#sliderhours" ).slider("value") + "H" +
            $( "#sliderminutes" ).slider("value") + "M" +
            $( "#sliderseconds" ).slider("value") + "S";

    });

    updateTextArea();
}
