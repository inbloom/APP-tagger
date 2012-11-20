
function updateTimeRequired(){

    var objName = "timeRequired"

    $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
        items[obj.id][objName] ="P" +
            $( "#amountyears" ).val()+ "Y" +
            $( "#amountmonths" ).val() + "M" +
            $( "#amountweeks" ).val() + "W" +
            $( "#amountdays" ).val() + "DT" +
            $( "#amounthours" ).val() + "H" +
            $( "#amountminutes" ).val() + "M" +
            $( "#amountseconds" ).val() + "S";

    });

    updateTextArea();
}
