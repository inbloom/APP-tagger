$(function() {

    $(".alignment-checkbox").live('click', function(evt) {

        checkbox = evt.target
        objectHash = $(checkbox).attr('value');

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {

            if ($(checkbox).is(':checked')) {
                items[obj.id].educationalAlignments[objectHash] = alignments[objectHash];
            } else {
                delete items[obj.id].educationalAlignments[objectHash];
            }

        });

        updateTextArea();
    });

});