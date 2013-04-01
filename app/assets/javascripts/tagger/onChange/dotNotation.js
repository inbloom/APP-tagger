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

            var dotNotationArrayKey = $.inArray(e.target.value, dotNotationDisplayArray)
            if (dotNotationArrayKey == -1) {
                $('#description').attr('value', "Error: The Dot Notation you entered doesn't appear to be valid.")
            } else {
// Commenting this out until we can get the right way to get it.. cause the bottom code is NOT the right way..
//                var dotNotationObj = alignmentArray[dotNotationArrayKey];
//                $('#itemURL').attr('value',dotNotationObj.url);
//                $('#itemGUID').attr('value',dotNotationObj.guid);
//                $.ajax({
//                    dataType: "json",
//                    url: dotNotationObj.description,
//                    success: function() {
//                    },
//                    failure: function() {
//                    }
//                });


                // The code below was written by someone who doesn't have a clue.. and yes.. it sucks..
                // It needs to be replaced as wow.. .. just.. wow.. this is extremely mickeymouse and is the
                // kind of stuff we have had to put up with through this whole project.. I hope like hell we
                // get a chance to fix this but if not.. to you future developer.. sorry man..
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

        }
    });

});