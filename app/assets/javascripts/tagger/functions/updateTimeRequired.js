
function updateTimeRequired(period){

    if (period != undefined) {
        var objName = "timeRequired";

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {

            var vals = items[obj.id][objName].match(/(\d+)/g);

            items[obj.id][objName] = "P" +
                ((period == 'Year')   ? $("#slideryears").slider("value")   :vals[0]) + "Y" +
                ((period == 'Month')  ? $("#slidermonths").slider("value")  :vals[1]) + "M" +
                ((period == 'Week')   ? $("#sliderweeks").slider("value")   :vals[2]) + "W" +
                ((period == 'Day')    ? $("#sliderdays").slider("value")    :vals[3]) + "DT" +
                ((period == 'Hour')   ? $("#sliderhours").slider("value")   :vals[4]) + "H" +
                ((period == 'Minute') ? $("#sliderminutes").slider("value") :vals[5]) + "M" +
                ((period == 'Second') ? $("#sliderseconds").slider("value") :vals[6]) + "S";

        });

        updateTextArea();
    }

}
