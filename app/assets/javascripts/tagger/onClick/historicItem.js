$(function() {

    $("#history a").live('click', function(obj) {

        var tag_id = $(this).attr('href').substr(1);
        $('#resetModal .btn-success').attr('href', "javascript:resetResource('"+tag_id+"');");
        $('#resetModal').modal('show');

        return false;
    })

});