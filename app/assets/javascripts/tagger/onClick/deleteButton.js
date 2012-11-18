$(function() {

    $("#deleteButton").click(function() {
        var metaSourceValue1 = $('#educationalAlignment').val();
        var metaSourceValue2 = $('#alignmentType').val();
        var metaSourceValue3 = $('#dotNotation').val();
        var metaSourceValue4 = $('#itemURL').val();
        var metaSourceValue5 = $('#description').val();
        var metaSourceValue6 = $('#itemGUID').val();

        // Updates the Educational Alignment Array of the Tagged Items
        boxes = document.checkBoxForm.tagItem.length;
        var onlyInChecked = true;

        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                for (j = 0; j < items[i].educationAlignmentArray.length; j++) {
                    if (	items[i].educationAlignmentArray[j].educationalAlignment == metaSourceValue1 &&
                        items[i].educationAlignmentArray[j].alignmentType == metaSourceValue2 &&
                        items[i].educationAlignmentArray[j].dotNotation == metaSourceValue3 &&
                        items[i].educationAlignmentArray[j].itemURL ==  metaSourceValue4 &&
                        items[i].educationAlignmentArray[j].description == metaSourceValue5 &&
                        items[i].educationAlignmentArray[j].guid == metaSourceValue6 ) {
                        items[i].educationAlignmentArray.splice(j,1);
                    }
                }
            }
            else {
                for (j = 0; j < items[i].educationAlignmentArray.length; j++) {
                    if (	items[i].educationAlignmentArray[j].educationalAlignment == metaSourceValue1 &&
                        items[i].educationAlignmentArray[j].alignmentType == metaSourceValue2 &&
                        items[i].educationAlignmentArray[j].dotNotation == metaSourceValue3 &&
                        items[i].educationAlignmentArray[j].itemURL ==  metaSourceValue4 &&
                        items[i].educationAlignmentArray[j].description == metaSourceValue5 &&
                        items[i].educationAlignmentArray[j].guid == metaSourceValue6 ) {
                        onlyInChecked = false;
                        if (items[i].title == '') alert("This alignment exists for the Tagged Item: " + items[i].id + "which was not selected for deletion.");
                        if (items[i].title != '') alert("This alignment exists for the Tagged Item: " + items[i].title + "which was not selected for deletion.");
                    }
                }
            }
            updateTextArea();


            if (onlyinChecked){
                document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");


                // Update the Alignment Previous Session History
                $('#currentAlignmentTable').html('<thead><tr><th>Select</th><th>Dot Notation</th></tr></thead><tbody></tbody>');
                for (var i = 0; i < currentAlignmentArray.length; i++){
                    if (			currentAlignmentArray[i].educationalAlignment == metaSourceValue1 &&
                        currentAlignmentArray[i].alignmentType == metaSourceValue2 &&
                        currentAlignmentArray[i].dotNotation == metaSourceValue3 &&
                        currentAlignmentArray[i].itemURL ==  metaSourceValue4 &&
                        currentAlignmentArray[i].description == metaSourceValue5 &&
                        currentAlignmentArray[i].guid == metaSourceValue6  ) {
                        currentAlignmentArray.splice(i,1);
                        currentAlignmentCounter = 0;
                    }
                }

                for (var i = 0; i < currentAlignmentArray.length; i++){
                    var metaSourceValue3 = currentAlignmentArray[i].dotNotation;
                    if (metaSourceValue3 == '') metaSourceValue3 = 'N/A';
                    $('#currentAlignmentTable > tbody:last').append('<tr style="background-color:#F8B93B;color:#ffffff;" id="currentAlignmentRow' + currentAlignmentCounter + '" onclick="updateAlignmentFields(' + currentAlignmentCounter + ');" onMouseOver="currentAlignmentMouseOver(' + currentAlignmentCounter + ');" onMouseOut="currentAlignmentMouseOut(' + currentAlignmentCounter + ');"><td><a id="currentAlignmentSelect' + currentAlignmentCounter + '"><i id="currentAlignmentIcon' + currentAlignmentCounter + '" class="icon-chevron-up icon-white"></i></a></td><td>'+ metaSourceValue3 +'</td></tr>');
                    currentAlignmentItem = currentAlignmentCounter;
                    currentAlignmentCounter++;
                }
                blankCurrentAlignment();
            }
        }
    });

});