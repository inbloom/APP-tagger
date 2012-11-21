
function updateInputFields(){
    // Clear form data
    $("form[name=LRMIData]").find("input[type=text], textarea, select").val("");
    // Clear the time required sliders as they are special
    clearTimeRequired();
    // Clear the iframe
    updateMainContentBottom();
    // If only one is selected then update the form with that one
    if ($("#multiItemSelector input[type=checkbox]:checked").length == 1) {
        var item = items[$("#multiItemSelector input[type=checkbox]:checked").first().attr('id')];

        //Setup General Tab for Single Selection
        if (item.title != "")                         $("#title").val(item.title);
        if (item.url != "")                           $("#url").val(item.url);
        if (item.language != "")                      $("#language").val(item.language);
        if (item.createdOn != "")                     $("#createdOn").val(item.createdOn);
        if (item.topic != "")                         $("#topic").val(item.topic);
        if (item.createdBy != "")                     $("#createdBy").val(item.createdBy);
        if (item.usageRightsURL != "")                $("#usageRightsURL").val(item.usageRightsURL);
        if (item.publisher != "")                     $("#publisher").val(item.publisher);
        if (item.isBasedOnURL != "")                  $("#isBasedOnURL").val(item.isBasedOnURL);
        if (item.timeRequired != "P0Y0M0W0DT0H0M0S")  $("#timeRequired").val(item.timeRequired);

        // Stuff the iframe
        if (item.url != "") updateMainContentBottom(item.url);

        //Setup Education Tab for Single Selection
        setupDisplayFieldsEducationTab(item, 'endUser');
        setupDisplayFieldsEducationTab(item, 'ageRange');
        setupDisplayFieldsEducationTab(item, 'educationalUse');
        setupDisplayFieldsEducationTab(item, 'interactivityType');
        setupDisplayFieldsEducationTab(item, 'learningResourceType');
        setupDisplayFieldsEducationTab(item, 'mediaType');
        setupDisplayFieldsEducationTab(item, 'groupType');

        //Setup Alignment Tab for Single Selection - Defaults to Last Added Educational Alignment
        if (typeof item.educationAlignmentArray[item.educationAlignmentArray.length-1] != 'undefined') {
            if (item.educationAlignmentArray[item.educationAlignmentArray.length-1].educationalAlignment != "")  $("#educationalAlignment").val(item.educationAlignmentArray[item.educationAlignmentArray.length-1].educationalAlignment);
            if (item.educationAlignmentArray[item.educationAlignmentArray.length-1].alignmentType != "")         $("#alignmentType").val(item.educationAlignmentArray[item.educationAlignmentArray.length-1].alignmentType);
            if (item.educationAlignmentArray[item.educationAlignmentArray.length-1].dotNotation != "")           $("#dotNotation").val(item.educationAlignmentArray[item.educationAlignmentArray.length-1].dotNotation);
            if (item.educationAlignmentArray[item.educationAlignmentArray.length-1].itemURL != "")               $("#itemURL").val(item.educationAlignmentArray[item.educationAlignmentArray.length-1].itemURL);
            if (item.educationAlignmentArray[item.educationAlignmentArray.length-1].description != "")           $("#description").val(item.educationAlignmentArray[item.educationAlignmentArray.length-1].description);
            if (item.educationAlignmentArray[item.educationAlignmentArray.length-1].guid != "")                  $("#itemGUID").val(item.educationAlignmentArray[item.educationAlignmentArray.length-1].guid);
        }

    }
}
