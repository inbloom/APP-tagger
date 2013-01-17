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

    $("#newbutton").click(function() {

        itemCounter = 0;
        // Uncheck everything when you add a new tag
        jQuery("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
            obj.checked = false;
            itemCounter++;
        });

        // Update the form
        updateInputFields();
        
        d = new Date();
        var curr_day = ('0' + d.getDate()).slice(-2);
        var curr_month = d.getMonth()+1;
        var curr_year = d.getFullYear();
        ds = curr_year + "-" + curr_month + "-" + curr_day;
        
        if ($("#createdOn").val() == "") {
          $("#createdOn").val(ds);
        }

        $("span.notYet").empty();
        $("#multiItemSelector").append($("<a href='#itemTag"+itemCounter+"' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#itemTag"+itemCounter+"' id='itemTag"+itemCounter+"URL' style='display:none;' class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='itemTag"+itemCounter+"Label' class='checkbox'><input id='itemTag"+itemCounter+"' type='checkbox' name='tagItem'/><span>New Item</span></label>"));
        $('#itemTag'+itemCounter).prop('checked', true);

        var timeFormat = "P" + 
            $( "#slideryears" ).slider("value") + "Y" + 
            $( "#slidermonths" ).slider("value") + "M" + 
            $( "#sliderweeks" ).slider("value") + "W" + 
            $( "#sliderdays" ).slider("value") + "DT" + 
            $( "#sliderhours" ).slider("value") + "H" + 
            $( "#sliderminutes" ).slider("value") + "M" + 
            $( "#sliderseconds" ).slider("value") + "S";

        items['itemTag' + itemCounter] = {
            'id':itemCounter,
            'title':'',
            'language':'',
            'url':'',
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
            'timeRequired':timeFormat,
            'educationalAlignments':{}
        };

        itemCounter++;

        updateMainContentBottom('');
        toggleForm();
        // Enable the publish button
        $("#publishButton").removeClass('disabled');
        // Enable the images
        $('#addThumbnailButton').removeClass('disabled');
        updateResourceCount();

    });

});