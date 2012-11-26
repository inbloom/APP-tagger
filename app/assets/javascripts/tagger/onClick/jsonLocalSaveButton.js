$(function() {

    $("#JSONLocalSaveButton").click( function() {
        var str = processJSONOutput();
        saveAndExport(str,".json");
    });

});