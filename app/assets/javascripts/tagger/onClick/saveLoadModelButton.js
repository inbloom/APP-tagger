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

    $("#saveLoadModalButton").click( function() {
        if (document.getElementById("loadModalTextArea").value != "") {

            itemCounter = 0;
            // Uncheck everything when you add a new tag
            jQuery("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
                obj.checked = false;
                itemCounter++;
            });

            document.getElementById("loadModalTextArea").value=document.getElementById("loadModalTextArea").value.replace(/^\s+|\s+$/g,"");
            var textLines = document.getElementById("loadModalTextArea").value.split("\n");
            for ( var i = 0; i < textLines.length; i++ ) {
                var textLine = textLines[i].split(",");

                items['itemTag' + itemCounter] = {
                    'id':itemCounter,
                    'title':textLine[0],
                    'language':'',
                    'thumbnail':'',
                    'url':textLine[1],
                    'tagDescription':'',
                    'createdOn':'',
                    'topic':'',
                    'createdBy':'',
                    'usageRightsURL':'',
                    'publisher':'',
                    'isBasedOnURL':'',
                    'endUser':'',
                    'ageRange':'',
                    'educationalUse':'',
                    'interactivityType':'',
                    'learningResourceType':'',
                    'mediaType':'',
                    'groupType':'',
                    'timeRequired':'P0Y0M0W0DT0H0M0S',
                    'educationalAlignments':{}
                };

                itemCounter++;
            }
            document.getElementById("loadModalTextArea").value = "";
        }
        else if (document.getElementById("files").value != "") {

        }
        redrawResourcesBasedOnItems();
    });

});