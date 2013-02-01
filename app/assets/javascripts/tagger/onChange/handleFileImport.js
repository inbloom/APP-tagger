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

    $("#files").change(function(evt){
        importedFiles = evt.target.files;
        for (var i = 0,file; file = importedFiles[i]; i++) {

            reader = new FileReader();
            reader.onload = (function(theFile) {

                itemCounter = 0;
                // Uncheck everything when you add a new tag
                jQuery("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
                    obj.checked = false;
                    itemCounter++;
                });

                return function(e) {
                    $("#loadModal").modal("hide");

                    // Uncheck everything when you add a new tag
                    jQuery("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
                        obj.checked = false;
                    });
                    // Update the form
                    updateInputFields();

                    if (itemCounter == 0){
                        jQuery("#multiItemSelector").empty();
                    }

                    // Get all the results
                    var allText = e.target.result;

                    // Parse JSON input
                    if (allText[0] == "{") {

                        var output = JSON.parse(allText);

                        for (i in output) {
                            if (output[i] == undefined || output[i].length == 0) continue;

                            output[i].id = itemCounter;
                            items['itemTag' + itemCounter] = output[i];

                            var itemTitle = (output[i].title!='')? ((output[i].title.length > 25) ? output[i].title.substr(0,25) + '&hellip;' : output[i].title) :"New Item " + itemCounter;
                            var itemUrl = output[i].url;

                            for (objHash in output[i].educationalAlignments) {
                                if (alignments[objHash] == undefined) {
                                    $('.noAlignmentsYet').hide();
                                    alignments[objHash] = output[i].educationalAlignments[objHash];
                                    $('#currentAlignmentTable > tbody:last').append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="'+objHash+'" />'+ output[i].educationalAlignments[objHash].dotNotation +'</label></td><td>'+ capitalize(output[i].educationalAlignments[objHash].alignmentType) +'</td></tr>');
                                }
                            }
                            $("#multiItemSelector").append($("<a href='#itemTag"+itemCounter+"' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#itemTag"+itemCounter+"' id='itemTag"+itemCounter+"URL' "+(itemUrl!=""?"":"style='display:none;'")+" class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='itemTag"+itemCounter+"Label' class='checkbox'><input id='itemTag"+itemCounter+"' type='checkbox' name='tagItem'/><span>"+itemTitle+"</span></label>"));
                            itemCounter++;

                        }

                    }

                    // parse CSV input
                    if (allText[0] != '{') {
console.log('CSV IMPORT');
                        var tempItems = [];
                        var output = $.csv2Array(allText);

                        for (var i = 1; i < output.length; i++) {
                            if (fileHasErrors) continue;
                            if (output[i] == undefined || output[i].length == 0) continue;

                            var itemTitle = (output[i][1] != '' && output[i][1] != undefined)? ((output[i][1].length > 25) ? output[i][1].substr(0,25) + '&hellip;' : output[i][1]) :"New Item " + itemCounter;
                            var itemUrl = output[i][2];

                            // Parse the education alignments and use them, or create new ones.
                            var tempEducationAlignmentArray = output[i][17].split(",");
                            var tempAlignmentTypeArray = output[i][18].split(",");
                            var tempDotNotationArray = output[i][19].split(",");
                            var tempDescriptionArray = output[i][21].split(",");
                            var tempItemURLArray = output[i][20].split(",");

                            var itemEducationAlignments = {}
                            for (ea = 0; ea < tempEducationAlignmentArray.length; ea++) {
                                if (tempEducationAlignmentArray[ea] == '' ||
                                    tempAlignmentTypeArray[ea] == '' ||
                                    tempDescriptionArray[ea] == '' ||
                                    tempItemURLArray[ea] == '') continue;
                                var object = {
                                    'educationalAlignment' : tempEducationAlignmentArray[ea],
                                    'alignmentType' : tempAlignmentTypeArray[ea],
                                    'dotNotation' : tempDotNotationArray[ea],
                                    'description' : tempDescriptionArray[ea],
                                    'itemURL' : tempItemURLArray[ea]
                                };
                                var objHash = objectToHash(object);
                                if (alignments[objHash] == undefined) {
                                    $('.noAlignmentsYet').hide();
                                    alignments[objHash] = object;
                                    $('#currentAlignmentTable > tbody:last').append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="'+objHash+'" />'+ tempDotNotationArray[ea] +'</label></td><td>'+ capitalize(tempAlignmentTypeArray[ea]) +'</td></tr>');
                                }

                                itemEducationAlignments[objHash] = object;
                            }

                            tempItem = {
                                'id'                    : itemCounter,
                                'title'                 : validateImport('title', output[i][1]),
                                'language'              : validateImport('language', output[i][8]),
                                'thumbnail'             : validateImport('thumbnail', output[i][24]),
                                'url'                   : validateImport('url', itemUrl),
                                'tagDescription'        : validateImport('tagDescription', output[i][25]),
                                'createdOn'             : validateImport('createdOn', output[i][5]),
                                'topic'                 : validateImport('topic', output[i][4]),
                                'createdBy'             : validateImport('createdBy', output[i][6]),
                                'usageRightsURL'        : validateImport('usageRightsURL', output[i][10]),
                                'publisher'             : validateImport('publisher', output[i][7]),
                                'isBasedOnURL'          : validateImport('isBasedOnURL', output[i][11]),
                                'endUser'               : validateImport('endUser', output[i][12]),
                                'ageRange'              : validateImport('ageRange', output[i][14]),
                                'educationalUse'        : validateImport('educationalUse', output[i][13]),
                                'interactivityType'     : validateImport('interactivityType', output[i][15]),
                                'learningResourceType'  : validateImport('learningResourceType', output[i][16]),
                                'mediaType'             : validateImport('mediaType', output[i][9]),
                                'groupType'             : validateImport('groupType', output[i][23]),
                                'timeRequired'          : validateImport('timeRequired', output[i][3]),
                                'educationalAlignments' : itemEducationAlignments
                            };

                            // Did anything above generate an error?
                            if (fileHasErrors) {
console.log(fileErrors);
                            } else {
                                // Stuff the item
                                items['itemTag' + itemCounter] = tempItem;
                                // Inject the checkbox
                                $("#multiItemSelector").append($("<a href='#itemTag"+itemCounter+"' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#itemTag"+itemCounter+"' id='itemTag"+itemCounter+"URL' "+(itemUrl!=""?"":"style='display:none;'")+" class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='itemTag"+itemCounter+"Label' class='checkbox'><input id='itemTag"+itemCounter+"' type='checkbox' name='tagItem'/><span>"+itemTitle+"</span></label>"));
                                // Increment the counter
                                itemCounter++;

                            }

                        }

                    }

                    updateResourceCount();

                }
            })(file);

            reader.readAsText(file);

            $("#fileForm")[0].reset();

        }
    });

});