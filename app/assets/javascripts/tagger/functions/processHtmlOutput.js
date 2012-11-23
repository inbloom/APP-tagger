function processHTMLOutput(){
    for (i in items) {
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

        for (j in items[i].educationalAlignments) {
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
