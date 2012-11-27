$(function() {

    $("#exportJsonButton").click( function() {
        var str = processJSONOutput();
        saveAndExport(str,".json");
    });

});