
function updateTimeRequired(){
    boxes = document.checkBoxForm.tagItem.length;
    for (i = 0; i < boxes; i++) {
        if (document.checkBoxForm.tagItem[i].checked) {
            items[i].timeRequired = "P" + $( "#amountyears" ).val() + "Y" + $( "#amountmonths" ).val() + "M" + $( "#amountweeks" ).val() + "W" + $( "#amountdays" ).val() + "DT" + $( "#amounthours" ).val() + "H" + $( "#amountminutes" ).val() + "M" + $( "#amountseconds" ).val() + "S";
        }
    }
    updateTextArea();
}
