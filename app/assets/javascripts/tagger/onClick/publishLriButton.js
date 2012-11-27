$(function() {

    $("#publishLriButton").click( function() {
        var str = processJSONOutput();
        saveRemote(str, 'LRI');
    });

});