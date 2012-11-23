$(function() {

    $("#files").change(function(evt){
        importedFiles = evt.target.files;
        for (var i = 0,file; file = importedFiles[i]; i++) {

            reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    var allText = e.target.result;
                    var output = $.csv2Array(allText);

                    for (var i = 1; i < output.length; i++) {

                        // Uncheck everything when you add a new tag
                        jQuery("#multiItemSelector input[type=checkbox]").each(function(i,obj) {
                            obj.checked = false;
                        });
                        // Update the form
                        updateInputFields();

                        if (itemCounter == 0){
                            jQuery("#multiItemSelector").empty();
                        }
                        jQuery("#multiItemSelector").append($("<a href='#itemTag"+itemCounter+"' class='pull-right delete-tag'><i class='icon-remove'></i></a>  <a href='#itemTag"+itemCounter+"' id='itemTag"+itemCounter+"URL' style='display:none;' class='pull-right render-tag'><i class='icon-share'></i>&nbsp;</a>  <label id='itemTag"+itemCounter+"Label' class='checkbox'><input id='itemTag"+itemCounter+"' type='checkbox' name='tagItem'/><span>New Item "+itemCounter+"</span></label>"));
                        $('#itemTag'+itemCounter).prop('checked', true);

                        var timeFormat = "P" +
                            $( "#slideryears" ).slider("value") + "Y" +
                            $( "#slidermonths" ).slider("value") + "M" +
                            $( "#sliderweeks" ).slider("value") + "W" +
                            $( "#sliderdays" ).slider("value") + "DT" +
                            $( "#sliderhours" ).slider("value") + "H" +
                            $( "#sliderminutes" ).slider("value") + "M" +
                            $( "#sliderseconds" ).slider("value") + "S";

                        var educationAlignmentArray = new Array();

                        items['itemTag' + itemCounter] = {
                            'id':itemCounter,
                            'title':output[i][1],
                            'language':output[i][8],
                            'url':output[i][2],
                            'createdOn':output[i][5],
                            'topic':output[i][4],
                            'createdBy':output[i][6],
                            'usageRightsURL':output[i][1],
                            'publisher':output[i][7],
                            'isBasedOnURL':output[i][11],
                            'endUser':output[i][12],
                            'ageRange':output[i][14],
                            'educationalUse':output[i][13],
                            'interactivityType':output[i][15],
                            'learningResourceType':output[i][16],
                            'mediaType':output[i][9],
                            'groupType':output[i][23],
                            'timeRequired':timeFormat,
                            'educationAlignmentArray':educationAlignmentArray
                        };

                        itemCounter++;

                    }

                }
            })(file);

            reader.readAsText(file);

        }
    });

});