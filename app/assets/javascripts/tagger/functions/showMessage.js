
function showMessage(body, header) {
    $('#pleaseWaitModal').modal('hide');
    if (header == undefined) header = "System Message";
    $('#messageModal .header-text').html(header);
    $('#messageModal .body-text').html(body);
    $('#messageModal').modal('show');
}

function showPleaseWait(body) {
    $('#pleaseWaitModal .body-text').html(body);
    $('#pleaseWaitModal').modal('show');
}