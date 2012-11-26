$(function() {

    $("#HTMLLocalSaveButton").click( function() {
        var str = processHTMLOutput();
        saveAndExport(str,".html");
    });

});