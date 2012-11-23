$(function() {

    $(".delete-tag").live('click', function(obj) {
        var tag_id = $(obj.target).parent().attr('href').substr(1);

        $('#deleteModal .btn-danger').attr('href', "javascript:deleteTag('"+tag_id+"');");
        $('#deleteModal').modal('show');

        return false;
    })

});