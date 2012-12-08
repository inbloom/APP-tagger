$(function() {
    $("#selectDeselectAllResources").click(function() {
        checked = $(this).attr('checked');

        $("#multiItemSelector input[type=checkbox]").each(function() {
            if (checked) {
                $(this).attr('checked',true);
            } else {
                $(this).removeAttr('checked');
            }
        });

    });
});
