
function processJSONOutput(){
    //var myJSONText = JSON.stringify(items);
    var d = new Date();

    // Common JSON File Header
    var myJSONText = "{\n   \"tagger\":{\n      \"name\":\"Agilix LRMI Tagger\",\n      \"version\":\"1.0\"\n   },";
    myJSONText = myJSONText + "   \"document_version\":\"1.0\",\n   \"document_creation_time\":\"" +		ISODateString(d) + "\",\n   \"userFirstName\":\""+ firstName +"\",\n   \"userLastName\":\""+ lastName +"\",\n   \"userOrganization\":\""+ organizationName +"\",\n   \"userEmail\":\""+ userEmail +"\",\n   \"userRole\":\""+ userRole +"\",\n   \"userGrade\":\""+ userGrade +"\",\n   \"userExperience\":\""+ userExperience +"\",\n   \"microdata\":{\n      \"items\":[";

    // Setup new Item JSON Output per Item
    for (var i = 0; i < items.length; i++) {

        // General Information
        myJSONText = myJSONText + "\n         {\n            \"type\":\"http://schema.org/CreativeWork\",\n            \"properties\":{\n               \"inLanguage\":[\""+items[i].language+"\"],\n               \"name\":[\""+items[i].title.replace(/\"/g, "'")+"\"],\n               \"url\":[\""+items[i].url+"\"],\n               \"about\":[\""+items[i].topic.replace(/\"/g, "'")+"\"],\n               \"dateCreated\":[\""+items[i].createdOn+"\"],\n               \"thumbnailURL\":[\"N/A\"],\n               \"author\":[{\n                  \"type\":\"http://schema.org/Person\",\n                  \"properties\":{\n                     \"name\":[\""+items[i].createdBy+"\"]\n                  }\n               }],\n               \"publisher\":[{\n                  \"type\":\"http://schema.org/Organization\",\n                  \"properties\":{\n                     \"name\":[\""+items[i].publisher+"\"]\n                  }\n               }],\n               \"useRightsURL\":[\""+items[i].usageRightsURL+"\"],\n               \"isBasedOnURL\":[\""+items[i].isBasedOnURL+"\"],";


        myJSONText = myJSONText + "\n               \"intendedEndUserRole\":[\n";
        var tempString = items[i].endUser.split(',');
        for (var j = 0; j < tempString.length; j++) {
            myJSONText = myJSONText + "\t\t\"" + tempString[j].replace(/\"/g, "'")+"\",";
        }
        myJSONText = myJSONText.slice(0,myJSONText.length-1);
        myJSONText = myJSONText + "\n               ],";

        myJSONText = myJSONText + "\n               \"typicalAgeRange\":[\n";
        var tempString = items[i].ageRange.split(',');
        for (var j = 0; j < tempString.length; j++) {
            myJSONText = myJSONText + "\t\t\"" + tempString[j].replace(/\"/g, "'")+"\",";
        }
        myJSONText = myJSONText.slice(0,myJSONText.length-1);
        myJSONText = myJSONText + "\n               ],";

        myJSONText = myJSONText + "\n               \"educationalUse\":[\n";
        var tempString = items[i].educationalUse.split(',');
        for (var j = 0; j < tempString.length; j++) {
            myJSONText = myJSONText + "\t\t\"" + tempString[j].replace(/\"/g, "'")+"\",";
        }
        myJSONText = myJSONText.slice(0,myJSONText.length-1);
        myJSONText = myJSONText + "\n               ],";

        myJSONText = myJSONText + "\n               \"interactivityType\":[\n";
        var tempString = items[i].interactivityType.split(',');
        for (var j = 0; j < tempString.length; j++) {
            myJSONText = myJSONText + "\t\t\"" + tempString[j].replace(/\"/g, "'")+"\",";
        }
        myJSONText = myJSONText.slice(0,myJSONText.length-1);
        myJSONText = myJSONText + "\n               ],";

        myJSONText = myJSONText + "\n               \"learningResourceType\":[\n";
        var tempString = items[i].learningResourceType.split(',');
        for (var j = 0; j < tempString.length; j++) {
            myJSONText = myJSONText + "\t\t\"" + tempString[j].replace(/\"/g, "'")+"\",";
        }
        myJSONText = myJSONText.slice(0,myJSONText.length-1);
        myJSONText = myJSONText + "\n               ],";

        myJSONText = myJSONText + "\n               \"mediaType\":[\n";
        var tempString = items[i].mediaType.split(',');
        for (var j = 0; j < tempString.length; j++) {
            myJSONText = myJSONText + "\t\t\"" + tempString[j].replace(/\"/g, "'")+"\",";
        }
        myJSONText = myJSONText.slice(0,myJSONText.length-1);
        myJSONText = myJSONText + "\n               ],";

        myJSONText = myJSONText + "\n               \"groupType\":[\n";
        if (typeof items[i].groupType !== 'undefined') {
            var tempString = items[i].groupType.split(',');
            for (var j = 0; j < tempString.length; j++) {
                myJSONText = myJSONText + "\"" + tempString[j].replace(/\"/g, "'")+"\",";
            }
            myJSONText = myJSONText.slice(0,myJSONText.length-1);
        }
        myJSONText = myJSONText + "\n               ],";

        // Continue with LRMI Alignment Tab JSON Output per Field
        myJSONText = myJSONText + "\n               \"educationalAlignment\":[";

        var hasLength = false;
        for (j = 0; j < items[i].educationAlignmentArray.length; j++) {
            myJSONText = myJSONText + "\n                  {\n                     \"type\":\"http://schema.org/AlignmentObject\",\n                     \"properties\":{\n                        \"name\":[\"" + items[i].educationAlignmentArray[j].educationalAlignment + "\"],\n                        \"alignmentType\":[\""+items[i].educationAlignmentArray[j].alignmentType+"\"],\n                        \"targetDescription\":[\""+items[i].educationAlignmentArray[j].description.replace(/\"/g, "'")+"\"],\n                        \"targetName\":[\""+items[i].educationAlignmentArray[j].dotNotation+"\"],\n                        \"targetURL\":[\""+items[i].educationAlignmentArray[j].itemURL+"\"]\n                     }\n                  },";
            hasLength = true;
        }

        if(hasLength != false) {
            myJSONText = myJSONText.slice(0,myJSONText.length-1);
        }
        myJSONText = myJSONText + "\n               ]";
        if (i == items.length -1){
            myJSONText = myJSONText + "\n            }\n         }";
        }
        else {
            myJSONText = myJSONText + "\n            }\n         },";
        }
    }

    // Closing JSON output and preparing to send for post processing download
    myJSONText = myJSONText + "\n      ]\n   }\n}";
    return myJSONText;
}



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

function processHTMLOutput(){
    boxes = items.length;
    for (i = 0; i < boxes; i++) {
        var str = '<meta itemscope="itemscope" itemtype="http://schema.org/CreativeWork">\n';
        str = str + '\t<meta itemprop="inLanguage" content="' + items[i].language + '"></meta>\n';
        str = str + '\t<meta itemprop="name" content="' + items[i].title.replace(/\"/g, "'") + '"></meta>\n';
        str = str + '\t<meta itemprop="url" content="' + items[i].url + '"></meta>\n';
        str = str + '\t<meta itemprop="about" content="' + items[i].topic.replace(/\"/g, "'") + '"></meta>\n';
        str = str + '\t<meta itemprop="dateCreated" content="' + items[i].createdOn + '"></meta>\n';
        str = str + '\t<meta itemprop="thumbnailUrl" content=""></meta>\n';

        str = str + '\t<meta itemprop="author" itemtype="http://schema.org/Person" itemscope="itemscope">\n';
        str = str + '\t\t<meta imemprop="name" content="' + items[i].createdBy.replace(/\"/g, "'") + '"></meta>\n';
        str = str + '\t</meta>\n';

        str = str + '\t<meta itemprop="publisher" itemtype="http://schema.org/Organization" itemscope="itemscope">\n';
        str = str + '\t\t<meta imemprop="name" content="' + items[i].publisher.replace(/\"/g, "'") + '"></meta>\n';
        str = str + '\t</meta>\n';

        str = str + '\t<meta itemprop="useRightsURL" content="' + items[i].usageRightsURL + '"></meta>\n';
        str = str + '\t<meta itemprop="isBasedOnURL" content="' + items[i].isBasedOnURL + '"></meta>\n';
        str = str + '\t<meta itemprop="timeRequired" content="' + items[i].timeRequired + '"></meta>\n';

        var string = items[i].endUser.replace(/\"/g, "'");
        var array = string.split(',');
        for (j = 0; j < array.length; j++){
            str = str + '\t<meta itemprop="intendedEndUserRole" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].ageRange.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str = str + '\t<meta itemprop="typicalAgeRange" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].educationalUse.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str = str + '\t<meta itemprop="educationalUse" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].interactivityType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str = str + '\t<meta itemprop="interactivityType" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].learningResourceType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str = str + '\t<meta itemprop="learningResourceType" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].mediaType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str = str + '\t<meta itemprop="mediaType" content="' + array[j] + '"></meta>\n';
        }

        if (typeof items[i].groupType !== 'undefined') {
            string = items[i].groupType.replace(/\"/g, "'");
            array = string.split(',');
            for (j = 0; j < array.length; j++){
                str = str + '\t<meta itemprop="groupType" content="' + array[j] + '"></meta>\n';
            }
        }

        for (j = 0; j < items[i].educationAlignmentArray.length; j++){
            str = str + '\t<meta itemprop="educationalAlignment" itemscope="itemscope" itemtype="schema.org/alignmentObject">';
            str = str + '\t\t<meta itemprop="name" content="' + items[i].educationAlignmentArray[j].educationalAlignment + '"></meta>\n';
            str = str + '\t\t<meta itemprop="alignmentType" content="' + items[i].educationAlignmentArray[j].alignmentType + '"></meta>\n';
            str = str + '\t\t<meta itemprop="targetDescription" content="' + items[i].educationAlignmentArray[j].description.replace(/\"/g, "'") + '"></meta>\n';
            str = str + '\t\t<meta itemprop="targetName" content="' + items[i].educationAlignmentArray[j].dotNotation + '"></meta>\n';
            str = str + '\t\t<meta itemprop="targetUrl" content="' + items[i].educationAlignmentArray[j].itemURL + '"></meta>\n';
            str = str + '\t</meta>\n';
        }

        str = str + '</meta>';

    }
    return str;
}
