$(function() {

    $(".delete-tag").live('click', function(obj) {
        var tag_id = $(obj.target).parent().attr('href');

    })

});