// jQuery( function ($) {
$("#HTMLLocalSaveButton").click( function() {
    var str = processHTMLOutput();
    saveLocal(str,".html");
});

// jQuery( function ($) {
$("#csvLocalSaveButton").click( function() {
    var str = processCSVOutput();
    saveLocal(str,".csv");
});

// jQuery( function ($) {
$("#JSONLocalSaveButton").click( function() {
    var str = processJSONOutput();
    saveLocal(str,".json");
});


// jQuery( function ($) {
$("#JSONServerSaveButton").click( function() {
    var str = processJSONOutput();
    saveServer(str);
});

// jQuery( function ($) {
$("#JSONLearningRegistrySaveButton").click( function() {
    var str = processJSONOutput();
    saveLearningRegistry(str);
});

// Save Load Modal Button Action

jQuery( function ($) {
    $("#saveLoadModalButton").click( function() {
        if (document.getElementById("loadModalTextArea").value != "")
        {
            jQuery("#mainContentTopLeft").show();
            jQuery("#mainContentTopRight").show();
            jQuery("#mainContentBottom").show();
            document.getElementById("loadModalTextArea").value=document.getElementById("loadModalTextArea").value.replace(/^\s+|\s+$/g,"");
            var textLines = document.getElementById("loadModalTextArea").value.split("\n");
            for ( var i = 0; i < textLines.length; i++ ) {
                var textLine = textLines[i].split(",");

                if (itemCounter == 0){
                    jQuery("#multiItemSelector").empty();
                }
                jQuery("#multiItemSelector").append($("<table style='width:100%;'><tr><td><label name='tagLabel"+itemCounter+"' id='tagLabel"+itemCounter+"' class='checkbox'><input type='checkbox' id='tagItem' name='tagItem'>" + textLine[0] + "</label></td><td><a id='tagURL"+itemCounter+"' class='pull-right' onclick='updateMainContentBottom(\"" + textLine[1] + "\");'><i class='icon-share'></i></a></td><tr/></table>"));

                var timeFormat = "P" + $( "#amountyears" ).val() + "Y" + $( "#amountmonths" ).val() + "M" + $( "#amountweeks" ).val() + "W" + $( "#amountdays" ).val() + "DT" + $( "#amounthours" ).val() + "H" + $( "#amountminutes" ).val() + "M" + $( "#amountseconds" ).val() + "S";

                var educationAlignmentArray = new Array();
                window.items.push({'id':itemCounter,'title':textLine[0],'language':'','url':textLine[1],'createdOn':'','topic':'','createdBy':'','usageRightsURL':'','publisher':'','isBasedOnURL':'','endUser':'','ageRange':'','educationalUse':'','interactivityType':'','learningResourceType':'','mediaType':'','timeRequired':timeFormat,'groupType':'','educationAlignmentArray':educationAlignmentArray});

                itemCounter++;
            }
            document.getElementById("loadModalTextArea").value = "";
        }
        else if (document.getElementById("files").value != "") {
            jQuery("#mainContentTopLeft").show();
            jQuery("#mainContentTopRight").show();
            jQuery("#mainContentBottom").show();
        }
    });
});

