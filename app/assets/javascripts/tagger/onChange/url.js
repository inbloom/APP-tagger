$(function() {

    $("#url").change(function(obj){
        var metaSourceValue = $(obj.target).val();

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
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