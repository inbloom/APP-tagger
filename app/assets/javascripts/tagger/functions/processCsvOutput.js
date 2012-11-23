function processCSVOutput(){
    var str = '"Metadata:","Title","URL","Time Required (FORMAT: P0Y0M0W0DT0H0M0S)","Topic","Created (FORMAT: YYYY-MM-DD)","Creator","Publisher","Language","Mediatype","Use Rights URL","Is based on  URL","Intended End User Role","Educational Use","Typical Age Range","Interactivity Type","Learning Resource Type","Educational Alignment","Alignment Type","Dot Notation","Target URL","Target Description","Group Type"\n';
    boxes = items.length;
    for (i = 0; i < boxes; i++) {
        str = str + '"",';
        str = str + '"' + items[i].title.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].url + '",';
        str = str + '"' + items[i].timeRequired + '",';
        str = str + '"' + items[i].topic.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].createdOn + '",';
        str = str + '"' + items[i].createdBy.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].publisher.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].language + '",';
        str = str + '"' + items[i].mediaType.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].usageRightsURL + '",';
        str = str + '"' + items[i].isBasedOnURL + '",';
        str = str + '"' + items[i].endUser.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].educationalUse.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].ageRange.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].interactivityType.replace(/\"/g, "'") + '",';
        str = str + '"' + items[i].learningResourceType.replace(/\"/g, "'") + '",';


        if (items[i].educationAlignmentArray.length == 0)
        {
            var alignmentString1 = ',';
            var alignmentString2 = ',';
            var alignmentString3 = ',';
            var alignmentString4 = ',';
            var alignmentString5 = ',,';
            str = str + alignmentString1 + alignmentString2 + alignmentString3 + alignmentString4 + alignmentString5;
        }
        else
        {
            var alignmentString1 = '"';
            var alignmentString2 = '"';
            var alignmentString3 = '"';
            var alignmentString4 = '"';
            var alignmentString5 = '"';

            for (j = 0; j < items[i].educationAlignmentArray.length; j++){
                alignmentString1 = alignmentString1 + items[i].educationAlignmentArray[j].educationalAlignment + ',';
                alignmentString2 = alignmentString2 + items[i].educationAlignmentArray[j].alignmentType + ',';
                alignmentString3 = alignmentString3 + items[i].educationAlignmentArray[j].dotNotation + ',';
                alignmentString4 = alignmentString4 + items[i].educationAlignmentArray[j].itemURL + ',';
                alignmentString5 = alignmentString5 + items[i].educationAlignmentArray[j].description.replace(/\"/g, "'") + ',';
            }
            alignmentString1 = alignmentString1.slice(0,alignmentString1.length-1);
            alignmentString2 = alignmentString2.slice(0,alignmentString2.length-1);
            alignmentString3 = alignmentString3.slice(0,alignmentString3.length-1);
            alignmentString4 = alignmentString4.slice(0,alignmentString4.length-1);
            alignmentString5 = alignmentString5.slice(0,alignmentString5.length-1);
            str = str + alignmentString1 + '",' + alignmentString2 + '",' + alignmentString3 + '",' + alignmentString4 + '",' + alignmentString5 + '",';
        }

        str = str.slice(0,str.length-1);
        if (typeof items[i].groupType !== 'undefined') {
            str = str + '"' + items[i].groupType.replace(/\"/g, "'") + '"';
        }
        str = str + '\n';

    }
    return str;
}