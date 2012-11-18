$(function() {

    var objName = "title"

    $("#"+objName).change(function(obj){
        var metaSourceValue = $(obj.target).val();

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            items[obj.id][objName] = metaSourceValue;
            $("#"+obj.id+"Label span")[0].innerHTML = metaSourceValue;
        });

        updateTextArea();
    });

});