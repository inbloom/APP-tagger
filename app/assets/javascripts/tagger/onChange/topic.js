$(function() {

    $("#topic").change(function(){
        var metaSourceValue = $('#topic').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].topic = metaSourceValue;
            }
        }
        updateTextArea();
    });

});