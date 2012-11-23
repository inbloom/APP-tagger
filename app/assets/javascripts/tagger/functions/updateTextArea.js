

function updateTextArea(){
    var textAreaValue = "";

    $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {

        if (items[obj.id].title != "") textAreaValue += "Title:\n"+items[obj.id].title+"\n";
        if (items[obj.id].url != "") textAreaValue += "URL:\n"+items[obj.id].url+"\n";
        if (items[obj.id].language != "") textAreaValue += "Language:\n"+items[obj.id].language+"\n";
        if (items[obj.id].createdOn != "") textAreaValue += "Created On:\n"+items[obj.id].createdOn+"\n";
        if (items[obj.id].topic != "") textAreaValue += "Topic/Subject:\n"+items[obj.id].topic+"\n";
        if (items[obj.id].createdBy != "") textAreaValue += "Created By:\n"+items[obj.id].createdBy+"\n";
        if (items[obj.id].usageRightsURL != "") textAreaValue += "Usage Rights URL:\n"+items[obj.id].usageRightsURL+"\n";
        if (items[obj.id].publisher != "") textAreaValue += "Publisher:\n"+items[obj.id].publisher+"\n";
        if (items[obj.id].isBasedOnURL != "") textAreaValue += "Is Based On URL:\n"+items[obj.id].isBasedOnURL+"\n";
        if (items[obj.id].endUser != "") textAreaValue += "End User:\n"+items[obj.id].endUser+"\n";
        if (items[obj.id].ageRange != "") textAreaValue += "Age Range:\n"+items[obj.id].ageRange+"\n";
        if (items[obj.id].educationalUse != "") textAreaValue += "Educational Use:\n"+items[obj.id].educationalUse+"\n";
        if (items[obj.id].interactivityType != "") textAreaValue += "Interactivity Type:\n"+items[obj.id].interactivityType+"\n";
        if (items[obj.id].learningResourceType != "") textAreaValue += "Learning Res Type:\n"+items[obj.id].learningResourceType+"\n";
        if (items[obj.id].mediaType != "") textAreaValue += "Media Type:\n"+items[obj.id].mediaType+"\n";
        if (items[obj.id].groupType != "") textAreaValue += "Group Type:\n"+items[obj.id].groupType+"\n";
        if (items[obj.id].timeRequired != "P0Y0M0W0DT0H0M0S") textAreaValue += "Time Required:\n"+items[obj.id].timeRequired+"\n\n";

        for (j = 0; j < items[obj.id].educationAlignmentArray.length; j++){
            if (items[obj.id].educationAlignmentArray[j].educationalAlignment != "") textAreaValue += "Educational Alignment:\n"+ items[obj.id].educationAlignmentArray[j].educationalAlignment+"\n";
            if (items[obj.id].educationAlignmentArray[j].alignmentType != "") textAreaValue += "Alignment Type:\n"+ items[obj.id].educationAlignmentArray[j].alignmentType+"\n";
            if (items[obj.id].educationAlignmentArray[j].dotNotation != "") textAreaValue += "Dot Notation:\n"+ items[obj.id].educationAlignmentArray[j].dotNotation+"\n";
            if (items[obj.id].educationAlignmentArray[j].itemURL != "") textAreaValue += "Item URL:\n"+ items[obj.id].educationAlignmentArray[j].itemURL+"\n";
            if (items[obj.id].educationAlignmentArray[j].description != "") textAreaValue += "Description:\n"+ items[obj.id].educationAlignmentArray[j].description+"\n";
            //	if (items[obj.id].educationAlignmentArray[j].guid != "") textAreaValue += "Item GUID:\n"+ items[obj.id].educationAlignmentArray[j].guid+"\n\n";
        }
        textAreaValue += "\n-----------------------\n\n";

    });

    $("#textarea").val(textAreaValue);
}
