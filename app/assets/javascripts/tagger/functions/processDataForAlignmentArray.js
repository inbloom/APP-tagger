
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
