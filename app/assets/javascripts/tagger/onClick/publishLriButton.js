$(function() {

    $("#publishLriButton").click( function() {
        var str = processJSONOutput(true);
        saveRemote(str, 'LRI');
    });

});