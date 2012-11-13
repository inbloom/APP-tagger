
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
document.getElementById('files').addEventListener('change', handleFileSelect, false);
