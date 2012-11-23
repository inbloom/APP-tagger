$(function() {

    $("#HTMLLocalSaveButton").click( function() {
        var str = processHTMLOutput();
        saveLocal(str,".html");
    });

});