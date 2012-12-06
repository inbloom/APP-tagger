function resetResource(key) {

    $.ajax({
        type : "POST",
        dataType : 'json',
        url  : "/tagger/reset_resource",
        data : { uuid: key },
        success : function(xhr) {
            loadDrafts();
            loadHistory();
        },
        error : function(xhr, txtStatus, errThrown) {
            showMessage(xhr.responseText, "Reset Error (RELOAD YOUR UI!!)");
        }
    })

    // Hide the modal
    $('#resetModal').modal('hide');

}