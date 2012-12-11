// Delete tag by ID
function deleteTag(tag_id) {
    // Delete the item from the array
    if (items[tag_id] != undefined) {
        delete items[tag_id];
    }
    // Remove the refresh and delete buttons too
    if ($('#'+tag_id).length > 0) {
        $('#'+tag_id).addClass('deleted');
        $('#'+tag_id).parent().hide().addClass('deleted');
        $('a[href=#'+tag_id+']').remove();

        // Update the number of items
        $("#resourceCount").html($("#multiItemSelector input[type=checkbox]:checked").not('.deleted').length + " of " + $("#multiItemSelector input[type=checkbox]").not('.deleted').length + " resources");

    }
    // Hide the modal
    $("#deleteModal").modal('hide');
    // Redraw the output
    updateTextArea();
    return false;
}