$(function() {

    $("#publishLriButton").click( function() {
        showPleaseWait('Publishing...  (This can take some time depending on the number of resources you have selected..)');

        if (!$(this).hasClass('disabled')) {
            // First save the draft state
            var str = processJSONOutput();
            saveDraft(str);
            // Then save those that are checked remotely.
            var str = processJSONOutput(true);
            saveRemote(str, 'LRI');
        }
    });

});