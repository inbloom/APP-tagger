$(function() {

    $("#addButton").click(function() {
        var metaSourceValue1 = $('#educationalAlignment').val();
        var metaSourceValue2 = $('#alignmentType').val();
        var metaSourceValue3 = $('#dotNotation').val();
        var metaSourceValue4 = $('#itemURL').val();
        var metaSourceValue5 = $('#description').val();
        var metaSourceValue6 = $('#itemGUID').val();

        //Updates the Educational Alignment Array of the Tagged Items
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {

                //Check to see if the EducationalArray already contains this Alignment
                var inEducationalAlignmentTaggedItems = false;
                if (typeof items[i].educationAlignmentArray[0] !== 'undefined' && items[i].educationAlignmentArray[0] !== null){
                    for (var j = 0; j < items[i].educationAlignmentArray.length; j++) {
                        if(	(items[i].educationAlignmentArray[j].educationalAlignment == $('#educationalAlignment').val()) &&
                            (items[i].educationAlignmentArray[j].alignmentType == $('#alignmentType').val()) &&
                            (items[i].educationAlignmentArray[j].dotNotation == $('#dotNotation').val()) &&
                            (items[i].educationAlignmentArray[j].itemURL == $('#itemURL').val()) &&
                            (items[i].educationAlignmentArray[j].description == $('#description').val() ) &&
                            (items[i].educationAlignmentArray[j].guid == $('#itemGUID').val() )  ){
                            inEducationalAlignmentTaggedItems = true;
                            if (items[i].title == '') alert("This alignment has already been added to the Tagged Item: " + items[i].id );
                            if (items[i].title != '') alert("This alignment has already been added to the Tagged Item: " + items[i].title );
                        }
                    }
                    if (!inEducationalAlignmentTaggedItems) {
                        setTimeout(items[i].educationAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6}),3000);
                        document.getElementById('deleteButton').setAttribute("class","btn btn-warning");

                    }
                }
                else setTimeout(items[i].educationAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6}),3000);
                document.getElementById('deleteButton').setAttribute("class","btn btn-warning");
            }
        }


        //Check to see if the current Alignment is already Added to the currentAlignmentArray
        var alreadyExists = false;
        for (i = 0; i < currentAlignmentArray.length; i++) {
            if(	(currentAlignmentArray[i].educationalAlignment == $('#educationalAlignment').val()) &&
                (currentAlignmentArray[i].alignmentType == $('#alignmentType').val()) &&
                (currentAlignmentArray[i].dotNotation == $('#dotNotation').val()) &&
                (currentAlignmentArray[i].itemURL == $('#itemURL').val()) &&
                (currentAlignmentArray[i].description == $('#description').val() ) &&
                (currentAlignmentArray[i].guid == $('#itemGUID').val()  )){
                alreadyExists = true;
            }
        }

        if (!alreadyExists) {

            blankCurrentAlignment();

            // Add to the currentAlignmentArray
            currentAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6});

            //Updates the Alignment Table on the Alignment Tab
            if (metaSourceValue3 == '') metaSourceValue3 = 'N/A';
            $('#currentAlignmentTable > tbody:last').append('<tr style="background-color:#F8B93B;color:#ffffff;" id="currentAlignmentRow' + currentAlignmentCounter + '" onclick="updateAlignmentFields(' + currentAlignmentCounter + ');" onMouseOver="currentAlignmentMouseOver(' + currentAlignmentCounter + ');" onMouseOut="currentAlignmentMouseOut(' + currentAlignmentCounter + ');"><td><a id="currentAlignmentSelect' + currentAlignmentCounter + '"><i id="currentAlignmentIcon' + currentAlignmentCounter + '" class="icon-chevron-up icon-white"></i></a></td><td>'+ metaSourceValue3 +'</td></tr>');
            currentAlignmentItem = currentAlignmentCounter;
            currentAlignmentCounter++;
        }

        updateTextArea();

        return false;
    });

});