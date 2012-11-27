$(function() {

    $("#exportHtmlButton").click( function() {
        var str = processHTMLOutput();
        saveAndExport(str,".html");
    });

});