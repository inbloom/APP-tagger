$(function() {

    var objName = "createdOn"

    $("#"+objName).datepicker({
        format: 'yyyy-mm-dd'
    }).on('changeDate', function(obj){

        var metaSourceValue = $(obj.target).val();

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            items[obj.id][objName] = metaSourceValue;
        });

        updateTextArea();

    });

});