$(function() {

    $(".render-tag").live('click', function(obj) {

        var tag_id = $(obj.target).first().parent().attr('href').substr(1);
        updateMainContentBottom(items[tag_id]['url']);

        return false;
    })

});