$(function() {

    $("#JSONLearningRegistrySaveButton").click( function() {
        var str = processJSONOutput();
        saveLearningRegistry(str);
    });

});