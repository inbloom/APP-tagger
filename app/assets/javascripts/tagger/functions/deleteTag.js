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
  if (tag_id == 'selected') {
    $("#multiItemSelector input[type=checkbox]:checked").not('.deleted').each(function() {
      var id = $(this).prop('id');
      // Delete the item from the array
      if (items[id] != undefined) {
        delete items[id];
        removeUITagElements(id);
      }
    });

    // Uncheck the select all checkbox
    $("#selectDeselectAllResources").prop('checked', false);
    // hide delete all tags
    $("#deleteAllTags").hide();

  } else {
    // Delete the item from the array
    if (items[tag_id] != undefined) {
      delete items[tag_id];
      removeUITagElements(tag_id);
    }

    if ($("#multiItemSelector input[type=checkbox]:checked").not('.deleted').length == 0) {
      // Uncheck the select all checkbox
      $("#selectDeselectAllResources").prop('checked', false);
      // hide delete all tags
      $("#deleteAllTags").hide();
    }
  }
  // Update the 0 of 0 resources counter
  updateResourceCount();
  // Hide the modal
  $("#deleteModal").modal('hide');
  // Update the text area
  updateTextArea();
  return false;
}

// Remove the refresh and delete buttons too
function removeUITagElements(tag_id) {
  if ($('#'+tag_id).length > 0) {
    $('form#checkBoxForm').find('#'+tag_id).addClass('deleted');
    $('form#checkBoxForm').find('#'+tag_id).parent().hide().addClass('deleted');
    $('form#checkBoxForm').find('a[href=#'+tag_id+']').remove();
  }
}