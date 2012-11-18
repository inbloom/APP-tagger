$(function() {

    $("#createdBy").change(function(){
        var metaSourceValue = $('#createdBy').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].createdBy = metaSourceValue;
            }
        }
        updateTextArea();
    });

});