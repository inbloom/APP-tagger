function updateResourceCount() {
    // Update the number of items
    $("#resourceCount").html($("#multiItemSelector input[type=checkbox]:checked").not('.deleted').length + " of " + $("#multiItemSelector input[type=checkbox]").not('.deleted').length + " resources");
}

