
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
