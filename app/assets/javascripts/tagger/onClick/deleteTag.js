$(function() {

    $(".delete-tag").live('click', function(obj) {

        var tag_id = $(obj.target).parent().attr('href').substr(1);

console.log(tag_id);
        return false;
    })

});