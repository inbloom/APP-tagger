$(function() {

    $("#publishLriButton").click( function() {
        showPleaseWait('Publishing...');

        if (!$(this).hasClass('disabled')) {
            var str = processJSONOutput(true);
            saveRemote(str, 'LRI');
        }
    });

});