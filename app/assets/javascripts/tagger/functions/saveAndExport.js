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

// Save and Export the file
// This function returns a file..
// #TODO why aren't we using .ajax call?
function saveAndExport(str, fileType){
    var date = new Date();
    var form_action = location.protocol + '//' + location.host + "/tagger/save_export/";
    $('<form></form>', { action: form_action, method: 'POST'}).append(
        $('<input></input>', { name: 'filename', type: 'hidden', value: fileType + "_" + date.toISOString() + fileType })
    ).append(
        $('<input></input>', { name: 'data', type: 'hidden', value: str })
    ).appendTo("body").submit();
}

// Save the draft string (Items object stringified) to the server using a post xhr
// The successful response will be the items coming back and reloaded.
function saveDraft(str){
  $.ajax({
    type : "POST",
    dataType : 'json',
    url  : "/tagger/save_draft",
    data : { content : str },
    // On success update our items list to be what the server sends back
    // Really nothing should change other than now the items have a UUID
    success : function(xhr) {
      items = xhr
      showMessage("Successfully saved resources", "Success");
    },
    error : function(xhr, txtStatus, errThrown) {
      showMessage(errThrown, "Error saving drafts");
    }
  });
}

// Save the selected tag to the remote server chosen (LRI is the only one as of this writing)
// This will also save the current version of the tag to the db and then flag it as published
// it will then remove it from the current resources tab and place it into the history
function saveRemote(str, remote) {
    $.ajax({
        type : "POST",
        dataType : 'json',
        url  : "/tagger/save_remote",
        data : { content : str, remote : remote },
        // On success update our items list to be what the server sends back
        // Really nothing should change other than now the items have a UUID
        success : function(xhr) {
            items = xhr
            redrawResourcesBasedOnItems();
            loadHistory();
            showMessage("Resources published");
        },
        error : function(xhr, txtStatus, errThrown) {
            showMessage("Go ahead and reload your ui, any work you were doing should have been saved. <br />" + xhr.responseText, "Remote Error (RELOAD YOUR UI!!)");
        }
    })
}

// Load the drafts in the db into the items array and then redraw
function loadDrafts() {
    $.ajax({
        type : "POST",
        dataType : 'json',
        url  : "/tagger/load_drafts",
        // On success update our items list to be what the server sends back
        // Really nothing should change other than now the items have a UUID
        success : function(xhr) {
            items = xhr
            redrawResourcesBasedOnItems();
        },
        error : function(xhr, txtStatus, errThrown) {
            showMessage(errThrown, "Error loading drafts");
        }
    })
}

// Load the history in the db into the history tab not saved in an array at all
function loadHistory() {
    $.ajax({
        type : "POST",
        dataType : 'json',
        url  : "/tagger/load_history",
        success : function(xhr) {
            redrawHistoryBasedOn(xhr);
        },
        error : function(xhr, txtStatus, errThrown) {
            showMessage(errThrown, "Error loading drafts");
        }
    })
}

// Helper function to redraw panels based on the items array instead of the other way around
function redrawResourcesBasedOnItems() {
    $("#multiItemSelector").empty();

    // Uncheck everything when you add a new tag
    $("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
        obj.checked = false;
    });
    // Update the form
    updateInputFields();

    for (itemCounter in items) {
        $("#multiItemSelector span.notYet").hide();

        var title = (items[itemCounter]['title'].length > 25) ? items[itemCounter]['title'].substr(0,25) + '&hellip;' : items[itemCounter]['title'];
        $("#multiItemSelector").append($("<a href='#"+itemCounter+"' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#"+itemCounter+"' id='"+itemCounter+"URL' "+ (items[itemCounter]['url']?"":"style='display:none;'") +" class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='"+itemCounter+"Label' class='checkbox'><input id='"+itemCounter+"' type='checkbox' name='tagItem'/><span>"+title+"</span></label>"));

        for (objHash in items[itemCounter].educationalAlignments) {
            // Create our object
            var object = {
                'educationalAlignment' : items[itemCounter].educationalAlignments[objHash]['educationalAlignment'],
                'alignmentType' : items[itemCounter].educationalAlignments[objHash]['alignmentType'],
                'dotNotation' : items[itemCounter].educationalAlignments[objHash]['dotNotation'],
                'description' : items[itemCounter].educationalAlignments[objHash]['description'],
                'itemURL' : items[itemCounter].educationalAlignments[objHash]['itemURL']
            };

            // Okay add it.
            if (alignments[objHash] == undefined) {
                $('.noAlignmentsYet').hide();
                alignments[objHash] = object;
                $('#currentAlignmentTable > tbody:last').append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="'+objHash+'" />'+ object.dotNotation +'</label></td><td>'+ capitalize(object.alignmentType) +'</td></tr>');
            }
        }
    }
    updateTextArea();
    updateResourceCount();
}

// Helper function to redraw the history panel items based on list sent
function redrawHistoryBasedOn(history) {
    $("#history").empty();
    for (i in history) {
        var title = (history[i]['title'].length > 25) ? history[i]['title'].substr(0,25) + '&hellip;' : history[i]['title'];
        $("#history").append($("<label><a href='#"+history[i]["uuid"]+"'><i class='icon-repeat'></i> "+title+"</a></label>"))
    }
}