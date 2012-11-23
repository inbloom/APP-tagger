
function updateAlignmentFields(id){
    $('#educationalAlignment').val(currentAlignmentArray[id].educationalAlignment);
    $('#alignmentType').val(currentAlignmentArray[id].alignmentType);
    $('#dotNotation').val(currentAlignmentArray[id].dotNotation);
    $('#itemURL').val(currentAlignmentArray[id].itemURL);
    $('#description').val(currentAlignmentArray[id].description);
    $('#itemGUID').val(currentAlignmentArray[id].guid);
    //change all rows to black and white
    blankCurrentAlignment();

    //Change the clicked field to gold and update the currentAlignmentItem to the current row
    document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#F8B93B";
    document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    currentAlignmentItem = id;
    document.getElementById('deleteButton').setAttribute("class","btn btn-warning");
}
