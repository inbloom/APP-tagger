$(function() {

    $("#isBasedOnURL").change(function(){
        var metaSourceValue = $('#isBasedOnURL').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].isBasedOnURL = metaSourceValue;
            }
        }
        updateTextArea();
    });

});