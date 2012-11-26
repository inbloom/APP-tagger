$(function() {

    $("#csvLocalSaveButton").click( function() {
        var str = processCSVOutput();
        saveAndExport(str,".csv");
    });

});