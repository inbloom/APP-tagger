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

    $('#thumbModalForm').bind('ajax:success', function(evt, obj, status) {
        // Get our url from the object and use http not https
        var url = obj.image.url.split('/');
        url[0] = url[0].replace('https','http');
        var fileHash = url.pop();
        // now build the thumb link
        var thumb = url.join('/') + '/browser_thumb_' + fileHash;
        // Set the hidden input box
        $('#thumbnail').attr('value', fileHash);
        // Hide the modal
        $('#thumbModal').modal('hide');
        // Set the thumb
        $('#thumbnailImage').attr('src', thumb);
        // Show remove image button
        $('#removeThumbnailButton').show();
        // Show thumbnail
        $('#thumbnailImage').show();
        // Update items object
        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            items[obj.id]["thumbnail"] = fileHash;
        });
        $("#pleasewait").hide();
    });

    $('#thumbModalForm').bind('ajax:complete', function(evt, obj, status) {
        $("#pleasewait").hide();
    });

});