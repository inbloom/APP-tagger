// Dear god this is terrible.. who wrote this?!
function processJSONOutput(){
    //var myJSONText = JSON.stringify(items);
    var d = new Date();

    // Common JSON File Header
    var myJSONText = "{\n   \"tagger\":{\n      \"name\":\"Agilix LRMI Tagger\",\n      \"version\":\"1.0\"\n   },";
    myJSONText = myJSONText + "   \"document_version\":\"1.0\",\n   \"document_creation_time\":\"" +		ISODateString(d) + "\",\n   \"userFirstName\":\""+ firstName +"\",\n   \"userLastName\":\""+ lastName +"\",\n   \"userOrganization\":\""+ organizationName +"\",\n   \"userEmail\":\""+ userEmail +"\",\n   \"userRole\":\""+ userRole +"\",\n   \"userGrade\":\""+ userGrade +"\",\n   \"userExperience\":\""+ userExperience +"\",\n   \"microdata\":{\n      \"items\":[";

    // Setup new Item JSON Output per Item
    for (i in items) {

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
        for (j in items[i].educationalAlignments) {
            myJSONText = myJSONText + "\n                  {\n                     \"type\":\"http://schema.org/AlignmentObject\",\n                     \"properties\":{\n                        \"name\":[\"" + items[i].educationalAlignments[j].educationalAlignment + "\"],\n                        \"alignmentType\":[\""+items[i].educationalAlignments[j].alignmentType+"\"],\n                        \"targetDescription\":[\""+items[i].educationalAlignments[j].description.replace(/\"/g, "'")+"\"],\n                        \"targetName\":[\""+items[i].educationalAlignments[j].dotNotation+"\"],\n                        \"targetURL\":[\""+items[i].educationalAlignments[j].itemURL+"\"]\n                     }\n                  },";
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