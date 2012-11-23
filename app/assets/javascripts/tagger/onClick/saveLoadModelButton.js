$(function() {

    $("#saveLoadModalButton").click( function() {
        if (document.getElementById("loadModalTextArea").value != "") {
            document.getElementById("loadModalTextArea").value=document.getElementById("loadModalTextArea").value.replace(/^\s+|\s+$/g,"");
            var textLines = document.getElementById("loadModalTextArea").value.split("\n");
            for ( var i = 0; i < textLines.length; i++ ) {
                var textLine = textLines[i].split(",");

                if (itemCounter == 0){
                    jQuery("#multiItemSelector").empty();
                }
                jQuery("#multiItemSelector").append($("<table style='width:100%;'><tr><td><label name='tagLabel"+itemCounter+"' id='tagLabel"+itemCounter+"' class='checkbox'><input type='checkbox' id='tagItem' name='tagItem'>" + textLine[0] + "</label></td><td><a id='tagURL"+itemCounter+"' class='pull-right' onclick='updateMainContentBottom(\"" + textLine[1] + "\");'><i class='icon-share'></i></a></td><tr/></table>"));

                var timeFormat = "P" +
                    $( "#slideryears" ).slider("value") + "Y" +
                    $( "#slidermonths" ).slider("value") + "M" +
                    $( "#sliderweeks" ).slider("value") + "W" +
                    $( "#sliderdays" ).slider("value") + "DT" +
                    $( "#sliderhours" ).slider("value") + "H" +
                    $( "#sliderminutes" ).slider("value") + "M" +
                    $( "#sliderseconds" ).slider("value") + "S";

                var educationAlignmentArray = new Array();
                items.push({'id':itemCounter,'title':textLine[0],'language':'','url':textLine[1],'createdOn':'','topic':'','createdBy':'','usageRightsURL':'','publisher':'','isBasedOnURL':'','endUser':'','ageRange':'','educationalUse':'','interactivityType':'','learningResourceType':'','mediaType':'','timeRequired':timeFormat,'groupType':'','educationAlignmentArray':educationAlignmentArray});

                itemCounter++;
            }
            document.getElementById("loadModalTextArea").value = "";
        }
        else if (document.getElementById("files").value != "") {
        }
    });

});