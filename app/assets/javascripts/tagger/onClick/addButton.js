
$(function() {

    $("#addButton").click(function() {
        // Hide the modal
        $('#alignmentsModal').modal('hide');
        $('.noAlignmentsYet').hide();
        // Dig out the data
        var formEducationAlignment = $('#educationalAlignment').val();
        var formAlignmentType = $('#alignmentType').val();
        var formDotNotation = $('#dotNotation').val();
        var formDescription = $('#description').val();
        var formItemUrl = $('#itemURL').val();
        var formGuid = $('#itemGUID').val();


        // Check to see if the current Alignment is already Added to the currentAlignmentArray
        // @TODO These should be a hash but dont have time
        var alreadyExists = false;
        for (i = 0; i < currentAlignmentArray.length; i++) {
            if ((currentAlignmentArray[i].educationalAlignment == formEducationAlignment) &&
                (currentAlignmentArray[i].alignmentType == formAlignmentType) &&
                (currentAlignmentArray[i].dotNotation == formDotNotation) &&
                (currentAlignmentArray[i].itemURL == formItemUrl) &&
                (currentAlignmentArray[i].description == formDescription) &&
                (currentAlignmentArray[i].guid == formGuid)
            ) {
                alreadyExists = true;
            }
        }

        // Okay add it.
        if (!alreadyExists) {
            blankCurrentAlignment();

            // Add to the currentAlignmentArray
            currentAlignmentArray.push({
                'educationalAlignment'  : formEducationAlignment,
                'alignmentType'         : formAlignmentType,
                'dotNotation'           : formDotNotation,
                'itemURL'               : formItemUrl,
                'description'           : formDescription,
                'guid'                  : formGuid
            });

            //Updates the Alignment Table on the Alignment Tab
            if (formDotNotation == '') formDotNotation = 'N/A';
            $('#currentAlignmentTable > tbody:last').append('<tr><td><label class="checkbox"><input type="checkbox" value="'+formGuid+'" />'+ formDotNotation +'</label></td><td>'+ formAlignmentType +'</td></tr>');

            currentAlignmentItem = currentAlignmentCounter;
            currentAlignmentCounter++;
        }

        updateTextArea();

//        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
//
//            //Check to see if the EducationalArray already contains this Alignment
//            var inEducationalAlignmentTaggedItems = false;
//            if (typeof items[obj.id].educationAlignmentArray[0] !== 'undefined' && items[obj.id].educationAlignmentArray[0] !== null){
//                for (var j = 0; j < items[obj.id].educationAlignmentArray.length; j++) {
//                    if(	(items[obj.id].educationAlignmentArray[j].educationalAlignment == $('#educationalAlignment').val()) &&
//                        (items[obj.id].educationAlignmentArray[j].alignmentType == $('#alignmentType').val()) &&
//                        (items[obj.id].educationAlignmentArray[j].dotNotation == $('#dotNotation').val()) &&
//                        (items[obj.id].educationAlignmentArray[j].itemURL == $('#itemURL').val()) &&
//                        (items[obj.id].educationAlignmentArray[j].description == $('#description').val() ) &&
//                        (items[obj.id].educationAlignmentArray[j].guid == $('#itemGUID').val() )  ){
//                        inEducationalAlignmentTaggedItems = true;
//                        if (items[obj.id].title == '') alert("This alignment has already been added to the Tagged Item: " + items[obj.id].id );
//                        if (items[obj.id].title != '') alert("This alignment has already been added to the Tagged Item: " + items[obj.id].title );
//                    }
//                }
//                if (!inEducationalAlignmentTaggedItems) {
//                    // @TODO Why was he using a settimeout here for this?  If it doesn't exist, push it in -- in 3 seconds?  huh?
//                    setTimeout(items[obj.id].educationAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6}),3000);
//                }
//            }
//            // @TODO Why was he using a settimeout here for this?
//            else setTimeout(items[obj.id].educationAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6}),3000);
//
//        });



        return false;
    });

});