$(function() {

    $("#publisher").change(function(){
        var metaSourceValue = $('#publisher').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].publisher = metaSourceValue;
            }
        }
        updateTextArea();
    });

});