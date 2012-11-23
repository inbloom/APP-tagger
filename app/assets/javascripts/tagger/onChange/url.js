$(function() {

    var objName = "url"

    $("#"+objName).change(function(obj){
        var metaSourceValue = $(obj.target).val();

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            items[obj.id][objName] = metaSourceValue;
            if (metaSourceValue != "") {
                $("#"+obj.id+"URL").show();
            } else {
                $("#"+obj.id+"URL").hide();
            }

        });

        updateTextArea();
        updateMainContentBottom(metaSourceValue);
    });

});