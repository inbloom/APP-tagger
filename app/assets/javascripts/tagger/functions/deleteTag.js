/*
 * Copyright 2012-2013 inBloom, Inc. and its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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