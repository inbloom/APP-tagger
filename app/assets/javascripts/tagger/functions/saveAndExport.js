
// Save and Export the file
// This function returns a file..
// #TODO why aren't we using .ajax call?
function saveAndExport(str, fileType){
    var date = new Date();
    var form_action = location.protocol + '//' + location.host + "/tagger/save_export/";
    $('<form></form>', { action: form_action, method: 'POST'}).append(
        $('<input></input>', { name: 'filename', type: 'hidden', value: fileType + "_" + ISODateString(date)+ fileType })
    ).append(
        $('<input></input>', { name: 'data', type: 'hidden', value: str })
    ).submit();
}

// Save the draft string (Items object stringified) to the server using a post xhr
// The successful response will be the items coming back and reloaded.
function saveDraft(str){
    $.ajax({
        type : "POST",
        dataType : 'json',
        url  : "/tagger/save_draft",
        data : { content : str },
        // On success update our items list to be what the server sends back
        // Really nothing should change other than now the items have a UUID
        success : function(xhr) {
            items = xhr
        },
        error : function(xhr, txtStatus, errThrown) {
            console.log(arguments);
        }
    })

}

function saveRemote(str) {

}