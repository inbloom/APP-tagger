$(function() {

    $(".alignment-checkbox").live('click', function(evt) {

        cb = evt.target
        guid = $(cb).attr('value');

        // Dig out the data
        var formEducationAlignment = alignments[guid].educationalAlignment;
        var formAlignmentType = alignments[guid].alignmentType;
        var formDotNotation = alignments[guid].dotNotation;
        var formDescription = alignments[guid].description;
        var formItemUrl = alignments[guid].itemURL;
        var formGuid = alignments[guid].guid;

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {

            if ($(cb).is(':checked')) {
                items[obj.id].educationalAlignments[guid] = alignments[guid];
            } else {
                delete items[obj.id].educationalAlignments[guid];
            }

        });

    });

});