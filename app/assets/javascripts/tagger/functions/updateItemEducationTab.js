
function updateItemEducationTab(nameBox, nameInput){

    $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
        var found = false;
        var LRMIForm = document.forms.LRMIData;
        var metaSourceValue = "";
        var x = 0;
        for (x=0;x<LRMIForm[nameBox].length;x++) {
            if (LRMIForm[nameBox][x].selected) {
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
        items[obj.id][nameBox] = metaSourceValue;
    });

    updateTextArea();
}
