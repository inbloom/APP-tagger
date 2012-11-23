
function updateAlignmentFields(guid){
    $('#educationalAlignment').val(alignments[guid].educationalAlignment);
    $('#alignmentType').val(alignments[guid].alignmentType);
    $('#dotNotation').val(alignments[guid].dotNotation);
    $('#itemURL').val(alignments[guid].itemURL);
    $('#description').val(alignments[guid].description);
    $('#itemGUID').val(alignments[guid].guid);
}
