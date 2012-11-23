
//Update Main Content Bottom with URL iFrame
function updateMainContentBottom(metaSourceValue){
    if (metaSourceValue == '' || metaSourceValue == undefined) {
        $('#iframe').attr('src','about:blank');
    } else {
        $('#iframe').attr('src',metaSourceValue);
    }
}
