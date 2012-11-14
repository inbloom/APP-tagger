jQuery(function($) {

    $('a[data-toggle="tab"]').on('shown', function (e) {
        activeTab = e.target;
        if (String(activeTab).substr(-2)  == "ut") {
            updateTextArea();
        }
    })

    $("#multiItemSelector").change(function(){
        blankCurrentAlignment();
        updateInputFields();
        updateTextArea();
    });

    // General Tab Input Fields

    $("#title").change(function(){
        var metaSourceValue = $('#title').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].title = metaSourceValue;
                document.getElementById('tagLabel' + i).innerHTML = "<input type='checkbox' checked='yes' id='tagItem' name='tagItem'>" + $('#title').val();
            }
        }
        updateTextArea();
    });

    $("#language").change(function(){
        var metaSourceValue = $('#language').val();
        if (metaSourceValue == "English") metaSourceValue = "en-US";
        if (metaSourceValue == "Spanish") metaSourceValue = "es";
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].language = metaSourceValue;
            }
        }
        updateTextArea();
    });

    $("#url").change(function(){
        var metaSourceValue = $('#url').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].url = metaSourceValue;
                var taggedURL = $('#url').val();
                document.getElementById('tagURL' + i).onclick = function(){updateMainContentBottom(String(taggedURL));};
                document.getElementById('tagURL' + i).style.display = "block";
            }
        }
        updateTextArea();
        updateMainContentBottom(metaSourceValue);
    });

    $("#createdOn").datepicker({
        format: 'yyyy-mm-dd'
    })
        .on('changeDate', function(){
            var metaSourceValue = $('#createdOn').val();
            boxes = document.checkBoxForm.tagItem.length;
            for (i = 0; i < boxes; i++) {
                if (document.checkBoxForm.tagItem[i].checked) {
                    items[i].createdOn = metaSourceValue;
                }
            }
            updateTextArea();
        });

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

    $("#createdBy").change(function(){
        var metaSourceValue = $('#createdBy').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].createdBy = metaSourceValue;
            }
        }
        updateTextArea();
    });

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

    $("#publisher").change(function(){
        var metaSourceValue = $('#publisher').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].publisher = metaSourceValue;
            }
        }
        updateTextArea();
    });

    $("#isBasedOnURL").change(function(){
        var metaSourceValue = $('#isBasedOnURL').val();
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                items[i].isBasedOnURL = metaSourceValue;
            }
        }
        updateTextArea();
    });

    // Education Tab Input Fields

    $("#endUser").change(function(){
        educationalTabUpdateDataModel('endUser','endUserOther');
    });

    $("#endUserOther").change(function(){
        educationalTabUpdateDataModel('endUser','endUserOther');
    });


    $("#ageRange").change(function(){
        educationalTabUpdateDataModel('ageRange','ageRangeOther');
    });

    $("#ageRangeOther").change(function(){
        educationalTabUpdateDataModel('ageRange','ageRangeOther');
    });


    $("#educationalUse").change(function(){
        educationalTabUpdateDataModel('educationalUse','educationalUseOther');
    });

    $("#educationalUseOther").change(function(){
        educationalTabUpdateDataModel('educationalUse','educationalUseOther');
    });

    $("#interactivityType").change(function(){
        educationalTabUpdateDataModel('interactivityType','interactivityTypeOther');
    });

    $("#interactivityTypeOther").change(function(){
        educationalTabUpdateDataModel('interactivityType','interactivityTypeOther');
    });

    $("#learningResourceType").change(function(){
        educationalTabUpdateDataModel('learningResourceType','learningResourceTypeOther');
    });

    $("#learningResourceTypeOther").change(function(){
        educationalTabUpdateDataModel('learningResourceType','learningResourceTypeOther');
    });

    $("#mediaType").change(function(){
        educationalTabUpdateDataModel('mediaType','mediaTypeOther');
    });

    $("#mediaTypeOther").change(function(){
        educationalTabUpdateDataModel('mediaType','mediaTypeOther');
    });

    $("#groupType").change(function(){
        educationalTabUpdateDataModel('groupType','groupTypeOther');
    });

    $("#groupTypeOther").change(function(){
        educationalTabUpdateDataModel('groupType','groupTypeOther');
    });

    // Alignment Tab Input Field Updates
    $("#dotNotation").change(function(e){
        if (e.target.value == previousDotValue) {}
        else {
            blankCurrentAlignment();
            previousDotValue = $('#dotNotation').val();
            document.getElementById('itemURL').value = '';
            document.getElementById('description').value = '';
            document.getElementById('description').value = 'Loading (please wait)....';
            document.getElementById('addButton').setAttribute("class","btn btn-success disabled");
            document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
            for (i = 0; i < alignmentArray.length; i++) {
                if ($('#dotNotation').val() ==  alignmentArray[i].title) {
                    document.getElementById('itemURL').value = alignmentArray[i].url;
                    document.getElementById('itemGUID').value = alignmentArray[i].guid;
                    $.ajax({
                        async: false,
                        url: 'http://anyorigin.com/get?url='+alignmentArray[i].description+'&callback=?',
                        dataType: "json",
                        success: function(data){
                            var newTitle = $(data.contents).filter('title').text();
                            if (newTitle != ''){
                                var tempDivLength = newTitle.length;
                                document.getElementById('description').value = newTitle;
                                document.getElementById('addButton').setAttribute("class","btn btn-success");
                                document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
                            }
                            if (newTitle == ''){
                                document.getElementById('description').value = 'No Description Available';
                                document.getElementById('addButton').setAttribute("class","btn btn-success");
                                document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
                            }

                        }
                    });
                }
            }
        }
    });

    $("#educationalAlignment").change(function(e){
        blankCurrentAlignment();
        document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
        document.getElementById('addButton').setAttribute("class","btn btn-success");
    });

    $("#alignmentType").change(function(e){
        blankCurrentAlignment();
        document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
        document.getElementById('addButton').setAttribute("class","btn btn-success");
    });

    $("#itemURL").change(function(e){
        blankCurrentAlignment();
        document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
        document.getElementById('addButton').setAttribute("class","btn btn-success");
    });

    $("#description").change(function(e){
        blankCurrentAlignment();
        document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
        document.getElementById('addButton').setAttribute("class","btn btn-success");
    });

});

