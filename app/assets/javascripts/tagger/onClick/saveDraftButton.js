$(function() {

    $("#saveDraftButton").click( function() {
        var str = processJSONOutput();
        saveDraft(str);
    });

});