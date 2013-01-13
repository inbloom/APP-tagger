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

    $("#dotNotation").change(function(e){
        if (e.target.value == previousDotValue) {}
        else {

            previousDotValue = $('#dotNotation').val();
            document.getElementById('itemURL').value = '';
            document.getElementById('description').value = '';
            document.getElementById('description').value = 'Loading (please wait)....';
            for (i = 0; i < alignmentArray.length; i++) {
                if ($('#dotNotation').val() ==  alignmentArray[i].title) {
                    document.getElementById('itemURL').value = alignmentArray[i].url;
                    document.getElementById('itemGUID').value = alignmentArray[i].guid;
                    $.ajax({
                        async: false,
                        url: 'http://anyorigin.com/get?url='+alignmentArray[i].description+'&callback=?',
                        dataType: "json",
                        success: function(data){
                            var newTitle = $(data.contents).filter('title').text().replace(' | Achievement Standards Network', '');
                            if (newTitle != ''){
                                var tempDivLength = newTitle.length;
                                document.getElementById('description').value = newTitle;
                            }
                            if (newTitle == ''){
                                document.getElementById('description').value = 'No Description Available';
                            }
                            validateAlignmentForm();
                        }
                    });
                }
            }
        }
    });

});