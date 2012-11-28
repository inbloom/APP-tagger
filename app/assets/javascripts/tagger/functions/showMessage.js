
function showMessage(body, header) {
    if (header == undefined) header = "System Message";
    $('#messageModal .header-text').html(header);
    $('#messageModal .body-text').html(body);
    $('#messageModal').modal('show');
}