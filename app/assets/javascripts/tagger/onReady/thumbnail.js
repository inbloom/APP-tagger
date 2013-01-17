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
        file = url.pop();
        // now build the thumb link
        var thumb = url.join('/') + '/browser_thumb_' + file;
        // Set the hidden input box
        $('#thumb').attr('value', thumb);
        // Hide the modal
        $('#thumbModal').modal('hide');
        // Set the thumb
        $('#thumbnailImage').attr('src', thumb);
        // Show remove image button
        $('#removeThumbnailButton').show();
        // Show thumbnail
        $('#thumbnailImage').show();

    });

});