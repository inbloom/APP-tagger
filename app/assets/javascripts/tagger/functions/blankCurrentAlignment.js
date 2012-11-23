
function blankCurrentAlignment() {
    for (var k = 0; k < currentAlignmentArray.length; k++){
        document.getElementById('currentAlignmentRow' + k).style.backgroundColor = "#ffffff";
        document.getElementById('currentAlignmentRow' + k).style.color = "#000000";
    }
}
