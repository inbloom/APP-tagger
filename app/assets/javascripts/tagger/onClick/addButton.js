
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

        // Create our object
        var object = {
            'educationalAlignment' : formEducationAlignment,
            'alignmentType' : formAlignmentType,
            'dotNotation' : formDotNotation,
            'description' : formDescription,
            'itemURL' : formItemUrl
        };

        var objHash = objectToHash(object);

        // Okay add it.
        if (alignments[objHash] == undefined) {
            alignments[objHash] = object;
            //Updates the Alignment Table on the Alignment Tab
            if (formDotNotation == '') formDotNotation = 'N/A';
            $('#currentAlignmentTable > tbody:last').append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="'+objHash+'" />'+ formDotNotation +'</label></td><td>'+ capitalize(formAlignmentType) +'</td></tr>');
        }

        updateTextArea();

        // Zero the form
        $('#alignmentType').val('');
        $('#dotNotation').val('');
        $('#description').val('');
        $('#itemURL').val('');
        $('#itemGUID').val('');

        return false;
    });

});