$(function() {

    $("#createdOn").datepicker({
        format: 'yyyy-mm-dd'
    }).on('changeDate', function(){
        var metaSourceValue = $('#createdOn').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].createdOn = metaSourceValue;
            }
        }
        updateTextArea();
    });

});