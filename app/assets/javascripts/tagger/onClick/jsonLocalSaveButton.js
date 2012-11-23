$(function() {

    $("#JSONLocalSaveButton").click( function() {
        var str = processJSONOutput();
        saveLocal(str,".json");
    });

});