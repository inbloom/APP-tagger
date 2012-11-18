$(function() {

    $("#createdOn").datepicker({
        format: 'yyyy-mm-dd'
    }).on('changeDate', function(obj){

        var metaSourceValue = $(obj.target).val();

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            items[obj.id].createdOn = metaSourceValue;
        });

        updateTextArea();

    });

});