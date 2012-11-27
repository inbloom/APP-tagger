$(function() {

    $("#exportCsvButton").click( function() {
        var str = processCSVOutput();
        saveAndExport(str,".csv");
    });

});