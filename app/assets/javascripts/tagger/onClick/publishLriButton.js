$(function() {

    $("#publishLriButton").click( function() {
        if (!$(this).hasClass('disabled')) {
            var str = processJSONOutput(true);
            saveRemote(str, 'LRI');
        }
    });

});