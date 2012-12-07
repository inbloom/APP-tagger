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
                    'url':textLine[1],
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