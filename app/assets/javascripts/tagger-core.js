
// Close Button Action
jQuery(function($){
    $("#saveUserData").click(function() {
        clearCookie();
        setCookie("firstName",$("#firstName").val(),1);
        setCookie("lastName",$("#lastName").val(),1);
        setCookie("organizationName",$("#organizationName").val(),1);
        setCookie("userEmail",$("#userEmail").val(),1);
        setCookie("userRole",$("#userRole").val(),1);
        setCookie("userGrade",$("#userGrade").val(),1);
        setCookie("userExperience",$("#userExperience").val(),1);
        checkCookie();
    });
});


// Update Javascript Struct with Text Field Data and Output to TextArea
$(document).ready(function(){

    window.itemCounter = 0;
    window.boxes = 0;
    window.currentAlignmentCounter = 0;
    window.currentAlignmentItem = 0;
    window.firtname = '';
    window.lastname = '';
    window.activeTab = null;
    window.previousDotValue = '';

    window.items = new Array();
    window.alignmentArray = new Array();
    window.dotNotationDisplayArray = new Array();
    window.currentAlignmentArray = new Array();

    var offsetTopPanels = 80;

    readAlignmentDataFromFiles();

    $("#amountyears").val('0');
    $("#amountmonths").val('0');
    $("#amountweeks").val('0');
    $("#amountdays").val('0');
    $("#amounthours").val('0');
    $("#amountminutes").val('0');
    $("#amountseconds").val('0');

    // Make two flyout panels resizable but not the iframe one
    $("#mainContentTopLeft" ).resizable({ handles: "e"});
    $("#mainContentTopRight" ).resizable({ handles: "e"});
//    $("#mainContentBottom" ).resizable();

//    jQuery("#mainContentTopRight").hide();
    jQuery("#mainContentBottom").show();

    $.ajaxSetup({ cache: false });

    var $window = $( window );
    var $mainContentTopLeft = $( '#mainContentTopLeft' );
    var $mainContentTopRight = $( '#mainContentTopRight' );
    var $mainContentBottom = $ ( '#mainContentBottom' );
    var $textarea = $( '#textarea' );
    var $endUser = $( '#endUser');
    var $ageRange = $( '#ageRange');
    var $educationalUse = $( '#educationalUse');
    var $interactivityType = $( '#interactivityType');
    var $learningResourceType = $( '#learningResourceType');
    var $mediaType = $( '#mediaType');
    var $groupType = $( '#groupType');
    var $timeRequired = $( '#timeRequired');
    var $dotNotation = $( '#dotNotation');
    var $createdOn = $( '#createdOn');

    $mainContentTopLeft.height( $window.height() - offsetTopPanels);
    $mainContentTopRight.height( $window.height() - offsetTopPanels);
    $mainContentBottom.height( $window.height() - offsetTopPanels);

    $mainContentBottom.width( $window.width() - $mainContentTopLeft.width() - $mainContentTopRight.width() - 50 );

    $textarea.height( $window.height() - 160);

//    $("#endUser").css("height", parseInt($("#endUser option").length) * 17.5);
//    $("#ageRange").css("height", parseInt($("#ageRange option").length) * 17);
//    $("#educationalUse").css("height", parseInt($("#educationalUse option").length) * 16.5);
//    $("#interactivityType").css("height", parseInt($("#interactivityType option").length) * 19);
//    $("#learningResourceType").css("height", parseInt($("#learningResourceType option").length) * 17);
//    $("#mediaType").css("height", parseInt($("#mediaType option").length) * 16.5);
//    $("#groupType").css("height", parseInt($("#groupType option").length) * 16.5);

    $dotNotation.typeahead({source: dotNotationDisplayArray, items:8});

    $createdOn.val('');

    $window.resize(function() {
        $mainContentTopLeft.height( $window.height() - offsetTopPanels);
        $mainContentTopRight.height( $window.height() - offsetTopPanels);
        $mainContentBottom.height( $window.height() - offsetTopPanels);
        $mainContentBottom.width( $window.width() - $mainContentTopLeft.width() - $mainContentTopRight.width() - 50 );

        $textarea.height( $window.height() - 160);
    });

    checkCookie();
});


jQuery(function($){
    $("#addButton").click(function() {
        var metaSourceValue1 = $('#educationalAlignment').val();
        var metaSourceValue2 = $('#alignmentType').val();
        var metaSourceValue3 = $('#dotNotation').val();
        var metaSourceValue4 = $('#itemURL').val();
        var metaSourceValue5 = $('#description').val();
        var metaSourceValue6 = $('#itemGUID').val();

        //Updates the Educational Alignment Array of the Tagged Items
        boxes = document.checkBoxForm.tagItem.length;
        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {

                //Check to see if the EducationalArray already contains this Alignment
                var inEducationalAlignmentTaggedItems = false;
                if (typeof items[i].educationAlignmentArray[0] !== 'undefined' && items[i].educationAlignmentArray[0] !== null){
                    for (var j = 0; j < items[i].educationAlignmentArray.length; j++) {
                        if(	(items[i].educationAlignmentArray[j].educationalAlignment == $('#educationalAlignment').val()) &&
                            (items[i].educationAlignmentArray[j].alignmentType == $('#alignmentType').val()) &&
                            (items[i].educationAlignmentArray[j].dotNotation == $('#dotNotation').val()) &&
                            (items[i].educationAlignmentArray[j].itemURL == $('#itemURL').val()) &&
                            (items[i].educationAlignmentArray[j].description == $('#description').val() ) &&
                            (items[i].educationAlignmentArray[j].guid == $('#itemGUID').val() )  ){
                            inEducationalAlignmentTaggedItems = true;
                            if (items[i].title == '') alert("This alignment has already been added to the Tagged Item: " + items[i].id );
                            if (items[i].title != '') alert("This alignment has already been added to the Tagged Item: " + items[i].title );
                        }
                    }
                    if (!inEducationalAlignmentTaggedItems) {
                        setTimeout(items[i].educationAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6}),3000);
                        document.getElementById('deleteButton').setAttribute("class","btn btn-warning");

                    }
                }
                else setTimeout(items[i].educationAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6}),3000);
                document.getElementById('deleteButton').setAttribute("class","btn btn-warning");
            }
        }


        //Check to see if the current Alignment is already Added to the currentAlignmentArray
        var alreadyExists = false;
        for (i = 0; i < currentAlignmentArray.length; i++) {
            if(	(currentAlignmentArray[i].educationalAlignment == $('#educationalAlignment').val()) &&
                (currentAlignmentArray[i].alignmentType == $('#alignmentType').val()) &&
                (currentAlignmentArray[i].dotNotation == $('#dotNotation').val()) &&
                (currentAlignmentArray[i].itemURL == $('#itemURL').val()) &&
                (currentAlignmentArray[i].description == $('#description').val() ) &&
                (currentAlignmentArray[i].guid == $('#itemGUID').val()  )){
                alreadyExists = true;
            }
        }

        if (!alreadyExists) {

            blankCurrentAlignment();

            // Add to the currentAlignmentArray
            currentAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6});

            //Updates the Alignment Table on the Alignment Tab
            if (metaSourceValue3 == '') metaSourceValue3 = 'N/A';
            $('#currentAlignmentTable > tbody:last').append('<tr style="background-color:#F8B93B;color:#ffffff;" id="currentAlignmentRow' + currentAlignmentCounter + '" onclick="updateAlignmentFields(' + currentAlignmentCounter + ');" onMouseOver="currentAlignmentMouseOver(' + currentAlignmentCounter + ');" onMouseOut="currentAlignmentMouseOut(' + currentAlignmentCounter + ');"><td><a id="currentAlignmentSelect' + currentAlignmentCounter + '"><i id="currentAlignmentIcon' + currentAlignmentCounter + '" class="icon-chevron-up icon-white"></i></a></td><td>'+ metaSourceValue3 +'</td></tr>');
            currentAlignmentItem = currentAlignmentCounter;
            currentAlignmentCounter++;
        }

        updateTextArea();

        return false;
    });
});


//Delete Button Implementation for Educational Alignment Tab
jQuery(function($){
    $("#deleteButton").click(function() {
        var metaSourceValue1 = $('#educationalAlignment').val();
        var metaSourceValue2 = $('#alignmentType').val();
        var metaSourceValue3 = $('#dotNotation').val();
        var metaSourceValue4 = $('#itemURL').val();
        var metaSourceValue5 = $('#description').val();
        var metaSourceValue6 = $('#itemGUID').val();



        // Updates the Educational Alignment Array of the Tagged Items
        boxes = document.checkBoxForm.tagItem.length;
        var onlyInChecked = true;

        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {
                for (j = 0; j < items[i].educationAlignmentArray.length; j++) {
                    if (	items[i].educationAlignmentArray[j].educationalAlignment == metaSourceValue1 &&
                        items[i].educationAlignmentArray[j].alignmentType == metaSourceValue2 &&
                        items[i].educationAlignmentArray[j].dotNotation == metaSourceValue3 &&
                        items[i].educationAlignmentArray[j].itemURL ==  metaSourceValue4 &&
                        items[i].educationAlignmentArray[j].description == metaSourceValue5 &&
                        items[i].educationAlignmentArray[j].guid == metaSourceValue6 ) {
                        items[i].educationAlignmentArray.splice(j,1);
                    }
                }
            }
            else {
                for (j = 0; j < items[i].educationAlignmentArray.length; j++) {
                    if (	items[i].educationAlignmentArray[j].educationalAlignment == metaSourceValue1 &&
                        items[i].educationAlignmentArray[j].alignmentType == metaSourceValue2 &&
                        items[i].educationAlignmentArray[j].dotNotation == metaSourceValue3 &&
                        items[i].educationAlignmentArray[j].itemURL ==  metaSourceValue4 &&
                        items[i].educationAlignmentArray[j].description == metaSourceValue5 &&
                        items[i].educationAlignmentArray[j].guid == metaSourceValue6 ) {
                        onlyInChecked = false;
                        if (items[i].title == '') alert("This alignment exists for the Tagged Item: " + items[i].id + "which was not selected for deletion.");
                        if (items[i].title != '') alert("This alignment exists for the Tagged Item: " + items[i].title + "which was not selected for deletion.");
                    }
                }
            }
            updateTextArea();


            if (onlyinChecked){
                document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");


                // Update the Alignment Previous Session History
                $('#currentAlignmentTable').html('<thead><tr><th>Select</th><th>Dot Notation</th></tr></thead><tbody></tbody>');
                for (var i = 0; i < currentAlignmentArray.length; i++){
                    if (			currentAlignmentArray[i].educationalAlignment == metaSourceValue1 &&
                        currentAlignmentArray[i].alignmentType == metaSourceValue2 &&
                        currentAlignmentArray[i].dotNotation == metaSourceValue3 &&
                        currentAlignmentArray[i].itemURL ==  metaSourceValue4 &&
                        currentAlignmentArray[i].description == metaSourceValue5 &&
                        currentAlignmentArray[i].guid == metaSourceValue6  ) {
                        currentAlignmentArray.splice(i,1);
                        currentAlignmentCounter = 0;
                    }
                }

                for (var i = 0; i < currentAlignmentArray.length; i++){
                    var metaSourceValue3 = currentAlignmentArray[i].dotNotation;
                    if (metaSourceValue3 == '') metaSourceValue3 = 'N/A';
                    $('#currentAlignmentTable > tbody:last').append('<tr style="background-color:#F8B93B;color:#ffffff;" id="currentAlignmentRow' + currentAlignmentCounter + '" onclick="updateAlignmentFields(' + currentAlignmentCounter + ');" onMouseOver="currentAlignmentMouseOver(' + currentAlignmentCounter + ');" onMouseOut="currentAlignmentMouseOut(' + currentAlignmentCounter + ');"><td><a id="currentAlignmentSelect' + currentAlignmentCounter + '"><i id="currentAlignmentIcon' + currentAlignmentCounter + '" class="icon-chevron-up icon-white"></i></a></td><td>'+ metaSourceValue3 +'</td></tr>');
                    currentAlignmentItem = currentAlignmentCounter;
                    currentAlignmentCounter++;
                }
                blankCurrentAlignment();
            }
        }
    });
});


// Setup Javascript Structure for Form Data

function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}


// Slider Setup

	$(function() {
		$( "#slideryears" ).slider({
			orientation: "horizontal",
			range: "min",
			min: 0,
			max: 24,
			value: 0,
			slide: function( event, ui ) {
				if (ui.value == 0){
				$( "#amountyears" ).html("Year");
				}
				else if (ui.value == 1){
				$( "#amountyears" ).html( ui.value + " year " );
				}
				else {
				$( "#amountyears" ).html( ui.value + " years " );
				}
				$( "#amountyears" ).val( ui.value );
				updateTimeRequired();
			}
		});

		$( "#slidermonths" ).slider({
			orientation: "horizontal",
			range: "min",
			min: 0,
			max: 11,
			value: 0,
			slide: function( event, ui ) {
				if (ui.value == 0){
				$( "#amountmonths" ).html("Month");
				}
				else if (ui.value == 1){
				$( "#amountmonths" ).html( ui.value + " month " );
				}
				else {
				$( "#amountmonths" ).html( ui.value + " months " );
				}
				$( "#amountmonths" ).val( ui.value );
				updateTimeRequired();
			}
		});

		$( "#sliderweeks" ).slider({
			orientation: "horizontal",
			range: "min",
			min: 0,
			max: 51,
			value: 0,
			slide: function( event, ui ) {
				if (ui.value == 0){
				$( "#amountweeks" ).html("Week");
				}
				else if (ui.value == 1){
				$( "#amountweeks" ).html( ui.value + " week " );
				}
				else {
				$( "#amountweeks" ).html( ui.value + " weeks " );
				}
				$( "#amountweeks" ).val( ui.value );
				updateTimeRequired();
			}
		});

		$( "#sliderdays" ).slider({
			orientation: "horizontal",
			range: "min",
			min: 0,
			max: 30,
			value: 0,
			slide: function( event, ui ) {
				if (ui.value == 0){
				$( "#amountdays" ).html("Day");
				}
				else if (ui.value == 1){
				$( "#amountdays" ).html( ui.value + " day " );
				}
				else {
				$( "#amountdays" ).html( ui.value + " days " );
				}
				$( "#amountdays" ).val( ui.value );
				updateTimeRequired();
			}
		});

		$( "#sliderhours" ).slider({
			orientation: "horizontal",
			range: "min",
			min: 0,
			max: 23,
			value: 0,
			slide: function( event, ui ) {
				if (ui.value == 0){
				$( "#amounthours" ).html("Hour");
				}
				else if (ui.value == 1){
				$( "#amounthours" ).html( ui.value + " hour " );
				}
				else {
				$( "#amounthours" ).html( ui.value + " hours " );
				}
				$( "#amounthours" ).val( ui.value );
				updateTimeRequired();
			}
		});

		$( "#sliderminutes" ).slider({
			orientation: "horizontal",
			range: "min",
			min: 0,
			max: 59,
			value: 0,
			slide: function( event, ui ) {
				if (ui.value == 0){
				$( "#amountminutes" ).html("Minute");
				}
				else if (ui.value == 1){
				$( "#amountminutes" ).html( ui.value + " minute " );
				}
				else {
				$( "#amountminutes" ).html( ui.value + " minutes " );
				}
				$( "#amountminutes" ).val( ui.value );
				updateTimeRequired();
			}
		});

		$( "#sliderseconds" ).slider({
			orientation: "horizontal",
			range: "min",
			min: 0,
			max:59,
			value: 0,
			slide: function( event, ui ) {
				if (ui.value == 0){
				$( "#amountseconds" ).html("Second");
				}
				else if (ui.value == 1){
				$( "#amountseconds" ).html( ui.value + " second " );
				}
				else {
				$( "#amountseconds" ).html( ui.value + " seconds " );
				}
				$( "#amountseconds" ).val( ui.value );
				updateTimeRequired();
			}
		});
	});			

function updateTimeRequired(){
	boxes = document.checkBoxForm.tagItem.length;
	for (i = 0; i < boxes; i++) {
			if (document.checkBoxForm.tagItem[i].checked) {
		items[i].timeRequired = "P" + $( "#amountyears" ).val() + "Y" + $( "#amountmonths" ).val() + "M" + $( "#amountweeks" ).val() + "W" + $( "#amountdays" ).val() + "DT" + $( "#amounthours" ).val() + "H" + $( "#amountminutes" ).val() + "M" + $( "#amountseconds" ).val() + "S";
		}
	}
	updateTextArea();
}


function updateGroupTypeVisibility(){
    if ($('#groupTypeDisplay').is(":hidden")) {
        $('#groupTypeDisplay').show();
    }
    else {
        $('#groupTypeDisplay').hide();
    }
}


function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    //console.log(evt.target.files[0].name);
    //$.twFile.load(evt.target.files[0].name);
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<br><li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
        // Only process image files.
        // if (!f.type.match('csv')) {
        // alert("File is not in CSV format.");
        // $("#saveLoadModalButton").attr('class','btn btn-primary disabled');
        // break;
        // }
        $("#saveLoadModalButton").attr('class','btn btn-primary');
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                var allText = e.target.result;
                var output = $.csv2Array(allText);
                for (var i = 1; i < output.length; i++)
                {

                    if (itemCounter == 0){
                        jQuery("#multiItemSelector").empty();
                    }
                    var timeFormat = "P" + $( "#amountyears" ).val() + "Y" + $( "#amountmonths" ).val() + "M" + $( "#amountweeks" ).val() + "W" + $( "#amountdays" ).val() + "DT" + $( "#amounthours" ).val() + "H" + $( "#amountminutes" ).val() + "M" + $( "#amountseconds" ).val() + "S";
                    var educationAlignmentArray = new Array();

                    educationAlignmentArray.push({
                        'educationalAlignment':output[i][17],
                        'alignmentType':output[i][18],
                        'dotNotation':output[i][19],
                        'itemURL':output[i][20],
                        'description':output[i][21],
                        'guid':output[i][22]});

                    window.items.push({
                        'id':itemCounter,
                        'title':output[i][1],
                        'language':output[i][8],
                        'url':output[i][2],
                        'createdOn':output[i][5],
                        'topic':output[i][4],
                        'createdBy':output[i][6],
                        'usageRightsURL':output[i][10],
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
                        'educationAlignmentArray':educationAlignmentArray});

                    jQuery("#multiItemSelector").append($("<table style='width:100%;'><tr><td><label name='tagLabel"+itemCounter+"' id='tagLabel"+itemCounter+"' class='checkbox'><input type='checkbox' id='tagItem' name='tagItem'>"+output[i][1]+"</label></td><td><a id='tagURL"+itemCounter+"' class='pull-right' style='display:block;' onclick='updateMainContentBottom(\""+output[i][2]+"\");'><i class='icon-share'></i></a></td><tr/></table>"));
                    jQuery("#mainContentTopLeft").hide();
                    jQuery("#mainContentTopRight").hide();
                    jQuery("#mainContentBottom").hide();
                    itemCounter++;


                    var metaSourceValue1 = output[i][17];
                    var metaSourceValue2 = output[i][18];
                    var metaSourceValue3 = output[i][19];
                    var metaSourceValue4 = output[i][20];
                    var metaSourceValue5 = output[i][21];
                    var metaSourceValue6 = output[i][22];

                    //Check to see if the current Alignment is already Added to the currentAlignmentArray
                    var alreadyExists = false;
                    for (j = 0; j < currentAlignmentArray.length; j++) {
                        if(	(currentAlignmentArray[j].educationalAlignment == metaSourceValue1) &&
                            (currentAlignmentArray[j].alignmentType == metaSourceValue2) &&
                            (currentAlignmentArray[j].dotNotation == metaSourceValue3) &&
                            (currentAlignmentArray[j].itemURL == metaSourceValue4) &&
                            (currentAlignmentArray[j].description == metaSourceValue5 ) &&
                            (currentAlignmentArray[j].guid == metaSourceValue6 )   ){
                            alreadyExists = true;
                        }
                    }

                    if (!alreadyExists) {

                        blankCurrentAlignment();

                        // Add to the currentAlignmentArray
                        currentAlignmentArray.push({'educationalAlignment':metaSourceValue1,'alignmentType':metaSourceValue2,'dotNotation':metaSourceValue3,'itemURL':metaSourceValue4,'description':metaSourceValue5,'guid':metaSourceValue6});

                        //Updates the Alignment Table on the Alignment Tab
                        if (metaSourceValue3 == '') metaSourceValue3 = 'N/A';
                        $('#currentAlignmentTable > tbody:last').append('<tr style="background-color:#F8B93B;color:#ffffff;" id="currentAlignmentRow' + currentAlignmentCounter + '" onclick="updateAlignmentFields(' + currentAlignmentCounter + ');" onMouseOver="currentAlignmentMouseOver(' + currentAlignmentCounter + ');" onMouseOut="currentAlignmentMouseOut(' + currentAlignmentCounter + ');"><td><a id="currentAlignmentSelect' + currentAlignmentCounter + '"><i id="currentAlignmentIcon' + currentAlignmentCounter + '" class="icon-chevron-up icon-white"></i></a></td><td>'+ metaSourceValue3 +'</td></tr>');
                        currentAlignmentItem = currentAlignmentCounter;
                        currentAlignmentCounter++;
                    }

                }
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
    //document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}
//document.getElementById('files').addEventListener('change', handleFileSelect, false);



function readAlignmentDataFromFiles() {
    $.ajax({
        type: "GET",
        url: "ccss2asn-math.csv",
        dataType: "text",
        success: function(data) {processDataForAlignmentArray(data);}
    });
    $.ajax({
        type: "GET",
        url: "ccss2asn-ela.csv",
        dataType: "text",
        success: function(data) {processDataForAlignmentArray(data);}
    });
}

function processDataForAlignmentArray(allText)	{
    var reader = new FileReader();
    reader.readAsText(allText);
    var output = $.csv2Array(allText);
    for (var i = 1; i < output.length-1; i++)
    {
        alignmentArray.push({'title':output[i][2],'url':output[i][3],'description':output[i][0],'guid':output[i][4]});
        dotNotationDisplayArray.push(output[i][2]);
    }
}

//Update Main Content Bottom with URL iFrame
function updateMainContentBottom(metaSourceValue){
    jQuery('#iframe').attr('src',metaSourceValue);
}

function updateTextArea(){
    if (String(activeTab).substr(-1)  == "t") {
        $("#textarea").empty();
        boxes = document.checkBoxForm.tagItem.length;

        for (i = 0; i < boxes; i++) {
            if (document.checkBoxForm.tagItem[i].checked) {

                if (items[i].title != "") $("#textarea").append("Title:\n<br/>", items[i].title,"\n<br/>");
                if (items[i].url != "") $("#textarea").append("URL:\n<br/>", items[i].url,"\n<br/>");
                if (items[i].language != "") $("#textarea").append("Language:\n<br/>", items[i].language,"\n<br/>");
                if (items[i].createdOn != "") $("#textarea").append("Created On:\n<br/>", items[i].createdOn,"\n<br/>");
                if (items[i].topic != "") $("#textarea").append("Topic/Subject:\n<br/>", items[i].topic,"\n<br/>");
                if (items[i].createdBy != "") $("#textarea").append("Created By:\n<br/>", items[i].createdBy,"\n<br/>");
                if (items[i].usageRightsURL != "") $("#textarea").append("Usage Rights URL:\n<br/>", items[i].usageRightsURL,"\n<br/>");
                if (items[i].publisher != "") $("#textarea").append("Publisher:\n<br/>", items[i].publisher,"\n<br/>");
                if (items[i].isBasedOnURL != "") $("#textarea").append("Is Based On URL:\n<br/>", items[i].isBasedOnURL,"\n<br/>");
                if (items[i].endUser != "") $("#textarea").append("End User:\n<br/>", items[i].endUser,"\n<br/>");
                if (items[i].ageRange != "") $("#textarea").append("Age Range:\n<br/>", items[i].ageRange,"\n<br/>");
                if (items[i].educationalUse != "") $("#textarea").append("Educational Use:\n<br/>", items[i].educationalUse,"\n<br/>");
                if (items[i].interactivityType != "") $("#textarea").append("Interactivity Type:\n<br/>", items[i].interactivityType,"\n<br/>");
                if (items[i].learningResourceType != "") $("#textarea").append("Learning Res Type:\n<br/>", items[i].learningResourceType,"\n<br/>");
                if (items[i].mediaType != "") $("#textarea").append("Media Type:\n<br/>", items[i].mediaType,"\n<br/>");
                if (items[i].groupType != "") $("#textarea").append("Group Type:\n<br/>", items[i].groupType,"\n<br/>");
                if (items[i].timeRequired != "P0Y0M0W0DT0H0M0S") $("#textarea").append("Time Required:\n<br/>", items[i].timeRequired,"\n<br/>\n<br/>");

                for (j = 0; j < items[i].educationAlignmentArray.length; j++){
                    if (items[i].educationAlignmentArray[j].educationalAlignment != "") $("#textarea").append("Educational Alignment:\n<br/>",  items[i].educationAlignmentArray[j].educationalAlignment,"\n<br/>");
                    if (items[i].educationAlignmentArray[j].alignmentType != "") $("#textarea").append("Alignment Type:\n<br/>",  items[i].educationAlignmentArray[j].alignmentType,"\n<br/>");
                    if (items[i].educationAlignmentArray[j].dotNotation != "") $("#textarea").append("Dot Notation:\n<br/>",  items[i].educationAlignmentArray[j].dotNotation,"\n<br/>");
                    if (items[i].educationAlignmentArray[j].itemURL != "") $("#textarea").append("Item URL:\n<br/>",  items[i].educationAlignmentArray[j].itemURL,"\n<br/>");
                    if (items[i].educationAlignmentArray[j].description != "") $("#textarea").append("Description:\n<br/>",  items[i].educationAlignmentArray[j].description,"\n<br/>");
                    //	if (items[i].educationAlignmentArray[j].guid != "") $("#textarea").append("Item GUID:\n<br/>",  items[i].educationAlignmentArray[j].guid,"\n<br/>\n<br/>");
                }
                $("#textarea").append("\n<br/>-----------------------\n\n<br/><br/>");
            }
        }
    }
}

function updateInputFields(){

    // Check to see if no tags are checked.  If none are checked, blank out all fields.

    var LRMIForm = document.forms.LRMIData.elements;
    var myform = document.checkBoxForm;
    var TempObject;
    var checkedArray = new Array();
    boxes = 0;
    for (var i=0; i<document.checkBoxForm.tagItem.length; i++) {
        if (myform.elements['tagItem'][i].checked) {
            boxes++;
            TempObject = items[i];
            checkedArray.push(items[i]);
        }
    }

    // If no tags, or 1 tag are checked we want to clear out the fields of current data.
    if (boxes == 0 || boxes == 1){ for (var i in LRMIForm){ LRMIForm[i].value = ''; } }

    // If only one tag is checked, set field values to the values of the single tag checked.
    if (boxes == 1){ setupDisplayFieldsForCurrentTagSelection(TempObject); }


    // If tags are checked, compare their values to see if they are the same.
    // If they are the same, set the field to the value. Otherwise, blank out the field.
    // TODO: Finish multiple selection
    else {
        // for (var i in LRMIForm){
        // if(LRMIForm[i].type == 'text'){
        // var LRMIid = LRMIForm[i].id;
        // var undef = false;  //TODO
        // for (var j in checkedArray){
        // if(typeof checkedArray[j][LRMIid] == 'undefined'){
        // LRMIForm[i].value = '';
        // undef = true;
        // }
        // else {
        // console.log(checkedArray[j][LRMIid]);
        // }
        // }
        // count(array_keys(items[j], 'yes')) == count(items[j]);//console.log(LRMIid);
        // console.log(items[j].LRMIid);
        // || LRMIForm[i].type == 'select-one' || LRMIForm[i].type == 'select-multiple'
        // }
        // }
        for (var i in LRMIForm){ LRMIForm[i].value = ''; }
    }
    // boxes = document.checkBoxForm.tagItem.length;

    // for (i = 0; i < boxes; i++) {
    // if (document.checkBoxForm.tagItem[i].checked) {



    // for (j = 0; j < items[i].educationAlignmentArray.length; j++){
    // if (items[i].educationAlignmentArray[j].educationalAlignment != "") $("#textarea").append("Educational Alignment:\n",  items[i].educationAlignmentArray[j].educationalAlignment,"\n");
    // if (items[i].educationAlignmentArray[j].alignmentType != "") $("#textarea").append("Alignment Type:\n",  items[i].educationAlignmentArray[j].alignmentType,"\n");
    // if (items[i].educationAlignmentArray[j].dotNotation != "") $("#textarea").append("Dot Notation:\n",  items[i].educationAlignmentArray[j].dotNotation,"\n");
    // if (items[i].educationAlignmentArray[j].itemURL != "") $("#textarea").append("Item URL:\n",  items[i].educationAlignmentArray[j].itemURL,"\n");
    // if (items[i].educationAlignmentArray[j].description != "") $("#textarea").append("Description:\n",  items[i].educationAlignmentArray[j].description,"\n\n");
    // }
    // $("#textarea").append("\n-----------------------\n\n");
}


function setupDisplayFieldsForCurrentTagSelection(TempObject){

    //Setup General Tab for Single Selection
    if (TempObject.title != "") 						$("#title").attr("value", TempObject.title);
    if (TempObject.url != "")							$("#url").attr("value",TempObject.url);
    if (TempObject.language == "en-US") 						$("#language").attr("value","English");
    if (TempObject.language == "es") 						$("#language").attr("value","Spanish");
    if (TempObject.language == "") 						$("#language").attr("value","");
    if (TempObject.createdOn != "") 					$("#createdOn").attr("value",TempObject.createdOn);
    if (TempObject.topic != "") 						$("#topic").attr("value",TempObject.topic);
    if (TempObject.createdBy != "") 					$("#createdBy").attr("value",TempObject.createdBy);
    if (TempObject.usageRightsURL != "") 				$("#usageRightsURL").attr("value",TempObject.usageRightsURL);
    if (TempObject.publisher != "") 					$("#publisher").attr("value",TempObject.publisher);
    if (TempObject.isBasedOnURL != "") 					$("#isBasedOnURL").attr("value",TempObject.isBasedOnURL);
    if (TempObject.timeRequired != "P0Y0M0W0DT0H0M0S") 	$("#timeRequired").attr("value",TempObject.timeRequired);


    //Setup Education Tab for Single Selection
    setupDisplayFieldsEducationTab(TempObject, 'endUser');
    setupDisplayFieldsEducationTab(TempObject, 'ageRange');
    setupDisplayFieldsEducationTab(TempObject, 'educationalUse');
    setupDisplayFieldsEducationTab(TempObject, 'interactivityType');
    setupDisplayFieldsEducationTab(TempObject, 'learningResourceType');
    setupDisplayFieldsEducationTab(TempObject, 'mediaType');
    setupDisplayFieldsEducationTab(TempObject, 'groupType');

    //Setup Alignment Tab for Single Selection - Defaults to Last Added Educational Alignment
    if (typeof TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1] != 'undefined') {
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].educationalAlignment != "") 	$("#educationalAlignment").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].educationalAlignment);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].alignmentType != "") 		$("#alignmentType").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].alignmentType);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].dotNotation != "") 			$("#dotNotation").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].dotNotation);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].itemURL != "") 				$("#itemURL").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].itemURL);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].description != "") 			$("#description").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].description);
        if (TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].guid != "") 				$("#itemGUID").attr("value",TempObject.educationAlignmentArray[TempObject.educationAlignmentArray.length-1].guid);
    }
}

function setupDisplayFieldsEducationTab(TempObject, selectBox){
    // This code is needed to merge the multiselect field and the "other" input field per
    if (typeof TempObject[selectBox] != 'undefined') {
        if (TempObject[selectBox] != "") {
            var optionsToSelect = TempObject[selectBox];
            var select = document.getElementById( [selectBox] );
            for ( var i = 0, l = select.options.length, o; i < l; i++ ){
                o = select.options[i];
                var tempO = o;
                if ( optionsToSelect.toLowerCase().indexOf( tempO.text.toLowerCase() ) != -1 ) {
                    o.selected = true;
                    optionsToSelect = optionsToSelect.replace(o.text,"");
                    optionsToSelect = optionsToSelect.replace(/,,/g,",");
                    optionsToSelect = optionsToSelect.replace(/^,/g,"");
                }
                else document.getElementById( [selectBox]+'Other' ).value = optionsToSelect;
            }
        }
    }
}


function educationalTabUpdateDataModel(nameBox, nameInput){
    for (i = 0; i < boxes; i++) {
        if (document.checkBoxForm.tagItem[i].checked) {
            var found = false;
            var LRMIForm = document.forms.LRMIData;
            var metaSourceValue = "";
            var x = 0;
            for (x=0;x<LRMIForm[nameBox].length;x++)
            {
                if (LRMIForm[nameBox][x].selected){
                    if (found) {
                        metaSourceValue = metaSourceValue + "," + LRMIForm[nameBox][x].value;
                    }
                    else {
                        metaSourceValue = LRMIForm[nameBox][x].value;
                        found = true;
                    }
                }
            }
            if (LRMIForm[nameInput].value != ''){
                metaSourceValue = metaSourceValue + "," + LRMIForm[nameInput].value;
            }
            items[i][nameBox] = metaSourceValue;
        }
    }
    updateTextArea();
}

function blankCurrentAlignment() {
    for (var k = 0; k < currentAlignmentArray.length; k++){
        document.getElementById('currentAlignmentRow' + k).style.backgroundColor = "#ffffff";
        document.getElementById('currentAlignmentRow' + k).style.color = "#000000";
    }
}

function updateAlignmentFields(id){
    $('#educationalAlignment').val(currentAlignmentArray[id].educationalAlignment);
    $('#alignmentType').val(currentAlignmentArray[id].alignmentType);
    $('#dotNotation').val(currentAlignmentArray[id].dotNotation);
    $('#itemURL').val(currentAlignmentArray[id].itemURL);
    $('#description').val(currentAlignmentArray[id].description);
    $('#itemGUID').val(currentAlignmentArray[id].guid);
    //change all rows to black and white
    blankCurrentAlignment();

    //Change the clicked field to gold and update the currentAlignmentItem to the current row
    document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#F8B93B";
    document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    currentAlignmentItem = id;
    document.getElementById('deleteButton').setAttribute("class","btn btn-warning");

}

function currentAlignmentMouseOver(id){
    document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#3F9FD9";
    document.getElementById('currentAlignmentRow' + id).style.color = "#ffffff";
}

function currentAlignmentMouseOut(id){
    if (id == currentAlignmentItem) {
        document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#F8B93B";
        document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    }
    else {
        document.getElementById('currentAlignmentRow' + id).style.backgroundColor = "#ffffff";
        document.getElementById('currentAlignmentRow' + id).style.color = "#000000";
    }
}

function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate())+'T'
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())+'Z'
}


function outputFile(myText, myType){
    var textarea = $('textarea');

}

function saveLocal(str, fileType){
    var date = new Date();
    var form_action = "http://savefile.joshmcarthur.com/"+ firstName + lastName + "_" + ISODateString(date)+ fileType;
    $('<form></form>', { action: form_action, method: 'POST'}).append(
        $('<input></input>', { name: 'content', type: 'hidden', value: str })
    ).submit();
}

function saveServer(str){
    $('<form></form>', { action: 'http://23.23.213.206:81/index.php', method: 'POST'}).append(
        $('<input></input>', { name: 'content', type: 'hidden', value: str })
    ).submit();
}

function saveLearningRegistry(str){
    //TODO:  Completed Learning Registry Submission
}
