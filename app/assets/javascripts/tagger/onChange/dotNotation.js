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
var bigd = '';
$(function() {

    $("#dotNotation").change(function(e){
        if (e.target.value == previousDotValue) {}
        else {
            previousDotValue = $('#dotNotation').val();
            document.getElementById('itemURL').value = '';
            document.getElementById('description').value = '';

            var dotNotationArrayKey = $.inArray(e.target.value, dotNotationDisplayArray)
            if (dotNotationArrayKey == -1) {
                $('#description').attr('value', "Error: The Dot Notation you entered doesn't appear to be valid.")
            } else {
               var dotNotationObj = alignmentArray[dotNotationArrayKey];
               $('#itemURL').attr('value',dotNotationObj.url);
               $('#itemGUID').attr('value',dotNotationObj.guid);
               $.ajax({
                   dataType: "json",
                   url: '/ccss-sorted.json',
                   success: function(data) {
                     bigd = data;
                     var dotty = e.target.value.replace(/\.([0-9])([a-z])/,".$1.$2")
                     var notation = '["'+dotty.replace(/\./g,'"]["')+'"]';
                     $('#description').attr('value', eval('data'+notation+'._text'));
                   },
                   failure: function() {
                     alert('failed');
                   }
               });
            }
        }
    });

});