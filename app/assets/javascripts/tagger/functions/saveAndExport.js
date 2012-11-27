
// Save and Export the file
// This function returns a file..
// #TODO why aren't we using .ajax call?
function saveAndExport(str, fileType){
    var date = new Date();
    var form_action = location.protocol + '//' + location.host + "/tagger/save_export/";
    $('<form></form>', { action: form_action, method: 'POST'}).append(
        $('<input></input>', { name: 'filename', type: 'hidden', value: fileType + "_" + ISODateString(date)+ fileType })
    ).append(
        $('<input></input>', { name: 'data', type: 'hidden', value: str })
    ).submit();
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
        },
        error : function(xhr, txtStatus, errThrown) {
            // # TODO No. Add a real error modal
            console.log(arguments);
        }
    })
}

function saveRemote(str, remote) {
// # TODO
}

// This should ONLY ever be the first thing done after the UI loads.
// Do it at anyother time and unexpected results could ensue.
function loadDrafts() {
    $.ajax({
        type : "POST",
        dataType : 'json',
        url  : "/tagger/load_drafts",
        // On success update our items list to be what the server sends back
        // Really nothing should change other than now the items have a UUID
        success : function(xhr) {
            items = xhr

            // Uncheck everything when you add a new tag
            jQuery("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
                obj.checked = false;
            });
            // Update the form
            updateInputFields();

            if (itemCounter == 0){
                jQuery("#multiItemSelector").empty();
            }

            for (itemCounter in items) {

                jQuery("#multiItemSelector").append($("<a href='#"+itemCounter+"' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#"+itemCounter+"' id='"+itemCounter+"URL' "+ (items[itemCounter]['url']?"":"style='display:none;'") +" class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='"+itemCounter+"Label' class='checkbox'><input id='"+itemCounter+"' type='checkbox' name='tagItem'/><span>"+items[itemCounter]['title']+"</span></label>"));

                for (objHash in items[itemCounter].educationalAlignments) {
                    // Create our object
                    var object = {
                        'educationalAlignment' : items[itemCounter].educationalAlignments[objHash]['educationAlignment'],
                        'alignmentType' : items[itemCounter].educationalAlignments[objHash]['alignmentType'],
                        'dotNotation' : items[itemCounter].educationalAlignments[objHash]['dotNotation'],
                        'description' : items[itemCounter].educationalAlignments[objHash]['description'],
                        'itemURL' : items[itemCounter].educationalAlignments[objHash]['itemUrl']
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

        },
        error : function(xhr, txtStatus, errThrown) {
            // # TODO No. Add a real error modal
            console.log(arguments);
        }
    })
}