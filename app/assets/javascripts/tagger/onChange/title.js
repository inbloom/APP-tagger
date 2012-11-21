$(function() {

    var objName = "title"

    $("#"+objName).change(function(obj){
        var metaSourceValue = $(obj.target).val();

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            items[obj.id][objName] = metaSourceValue;

            var title = (metaSourceValue.length > 25) ? metaSourceValue.substr(0,25) + '&hellip;' : metaSourceValue;
            $("#"+obj.id+"Label span")[0].innerHTML = title;
        });

        updateTextArea();
    });

});