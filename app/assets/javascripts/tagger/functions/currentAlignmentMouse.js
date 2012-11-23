// Terrible.

function currentAlignmentMouseOver(id){
    document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#3F9FD9";
    document.getElementById('currentAlignmentRow' + id).style.color = "#ffffff";
}

function currentAlignmentMouseOut(id){
    if (id == currentAlignmentItem) {
        document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#F8B93B";
        document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    }
    else {
        document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#ffffff";
        document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    }
}
