// Used by the alignment reader in order to get information out of the files
function processDataForAlignmentArray(allText)	{
    var lines = allText.split(/\n|\r/);
    for (var i = 1; i < lines.length -1 ; i++) {
        var split = lines[i].split(',');
        alignmentArray.push({
            'title'         : split[2],
            'url'           : split[3],
            'description'   : split[0],
            'guid'          : split[4]
        });
        dotNotationDisplayArray.push(split[2]);
    }
}
