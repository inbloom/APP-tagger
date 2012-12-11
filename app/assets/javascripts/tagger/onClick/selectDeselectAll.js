$(function() {
    $("#selectDeselectAllResources").click(function() {
        checked = $(this).attr('checked');

        $("#multiItemSelector input[type=checkbox]").each(function() {
            if (checked) {
                $(this).attr('checked',true);
                $("#publishLriButton").removeClass("disabled");
            } else {
                $(this).removeAttr('checked');
                $("#publishLriButton").addClass("disabled");
            }
        });

        // Update the number of items
        $("#resourceCount").html($("#multiItemSelector input[type=checkbox]:checked").length + " of " + $("#multiItemSelector input[type=checkbox]").length + " resources");

    });
});
