// This function is in a horrible state.. wtf does it do and why?

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
