$(function() {

    $("#csvLocalSaveButton").click( function() {
        var str = processCSVOutput();
        saveLocal(str,".csv");
    });

});