$(function() {

    $("#JSONServerSaveButton").click( function() {
        var str = processJSONOutput();
        saveServer(str);
    });

});