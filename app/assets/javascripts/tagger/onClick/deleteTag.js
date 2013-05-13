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

$(function() {

  $(document).on('click', ".delete-tag", function(obj) {
    var tag_id = $(obj.target).parent().attr('href').substr(1);
    if (tag_id != 'selected') {
      $('#deleteModal').find('p.question').html("You're about to delete a local resource, this can't be undone.");
    } else {
      $('#deleteModal').find('p.question').html("You're about to delete <strong>ALL SELECTED</strong> local resources, this can't be undone.");
    }
    $('#deleteModal .btn-danger').attr('onclick', "deleteTag('"+tag_id+"');").attr('href', "#"+tag_id);
    $('#deleteModal').modal('show');
    return false;
  })

});