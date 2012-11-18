$(function() {

    $("#usageRightsURL").change(function(){
        var metaSourceValue = $('#usageRightsURL').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].usageRightsURL = metaSourceValue;
            }
        }
        updateTextArea();
    });

});