

function setupDisplayFieldsForCurrentTagSelection(TempObject){

    //Setup General Tab for Single Selection
    if (TempObject.title != "") 						$("#title").attr("value", TempObject.title);
    if (TempObject.url != "")							$("#url").attr("value",TempObject.url);
    if (TempObject.language == "en-US") 						$("#language").attr("value","English");
    if (TempObject.language == "es") 						$("#language").attr("value","Spanish");
    if (TempObject.language == "") 						$("#language").attr("value","");
    if (TempObject.createdOn != "") 					$("#createdOn").attr("value",TempObject.createdOn);
    if (TempObject.topic != "") 						$("#topic").attr("value",TempObject.topic);
    if (TempObject.createdBy != "") 					$("#createdBy").attr("value",TempObject.createdBy);
    if (TempObject.usageRightsURL != "") 				$("#usageRightsURL").attr("value",TempObject.usageRightsURL);
    if (TempObject.publisher != "") 					$("#publisher").attr("value",TempObject.publisher);
    if (TempObject.isBasedOnURL != "") 					$("#isBasedOnURL").attr("value",TempObject.isBasedOnURL);
    if (TempObject.timeRequired != "P0Y0M0W0DT0H0M0S") 	$("#timeRequired").attr("value",TempObject.timeRequired);


    //Setup Education Tab for Single Selection
    setupDisplayFieldsEducationTab(TempObject, 'endUser');
    setupDisplayFieldsEducationTab(TempObject, 'ageRange');
    setupDisplayFieldsEducationTab(TempObject, 'educationalUse');
    setupDisplayFieldsEducationTab(TempObject, 'interactivityType');
    setupDisplayFieldsEducationTab(TempObject, 'learningResourceType');
    setupDisplayFieldsEducationTab(TempObject, 'mediaType');
    setupDisplayFieldsEducationTab(TempObject, 'groupType');

    //Setup Alignment Tab for Single Selection - Defaults to Last Added Educational Alignment
    if (typeof TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1] != 'undefined') {
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].educationalAlignment != "") 	$("#educationalAlignment").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].educationalAlignment);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].alignmentType != "") 		$("#alignmentType").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].alignmentType);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].dotNotation != "") 			$("#dotNotation").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].dotNotation);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].itemURL != "") 				$("#itemURL").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].itemURL);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].description != "") 			$("#description").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].description);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].guid != "") 				$("#itemGUID").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].guid);
    }
}