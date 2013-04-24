/*
 * Copyright 2012-2013 inBloom, Inc. and its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function processHTMLOutput(checked){
    var checked_items = {};
    if (checked == undefined) {
        checked_items = items;
    } else {
        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            checked_items[obj.id] = items[obj.id]
        });
    }
    
    str = "";
    for (i in checked_items) {
        str += '<meta itemscope="itemscope" itemtype="http://schema.org/CreativeWork">\n';
        str +=  '\t<meta itemprop="inLanguage" content="' + checked_items[i].language + '"></meta>\n';
        str +=  '\t<meta itemprop="name" content="' + checked_items[i].title.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t<meta itemprop="url" content="' + checked_items[i].url + '"></meta>\n';
        str +=  '\t<meta itemprop="about" content="' + checked_items[i].topic.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t<meta itemprop="dateCreated" content="' + checked_items[i].createdOn + '"></meta>\n';
        str +=  '\t<meta itemprop="thumbnailUrl" content=""></meta>\n';

        str +=  '\t<meta itemprop="author" itemtype="http://schema.org/Person" itemscope="itemscope">\n';
        str +=  '\t\t<meta imemprop="name" content="' + checked_items[i].createdBy.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t</meta>\n';

        str +=  '\t<meta itemprop="publisher" itemtype="http://schema.org/Organization" itemscope="itemscope">\n';
        str +=  '\t\t<meta imemprop="name" content="' + checked_items[i].publisher.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t</meta>\n';

        str +=  '\t<meta itemprop="useRightsURL" content="' + checked_items[i].usageRightsURL + '"></meta>\n';
        str +=  '\t<meta itemprop="isBasedOnURL" content="' + checked_items[i].isBasedOnURL + '"></meta>\n';
        str +=  '\t<meta itemprop="timeRequired" content="' + checked_items[i].timeRequired + '"></meta>\n';

        var string = checked_items[i].endUser.replace(/\"/g, "'");
        var array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="intendedEndUserRole" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].ageRange.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="typicalAgeRange" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].educationalUse.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="educationalUse" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].interactivityType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="interactivityType" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].learningResourceType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="learningResourceType" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].mediaType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="mediaType" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].groupType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="groupType" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].thumbnail.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="thumbnail" content="' + array[j] + '"></meta>\n';
        }

        string = checked_items[i].tagDescription.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="description" content="' + array[j] + '"></meta>\n';
        }

        for (j in checked_items[i].educationalAlignments) {
            str +=  '\t<meta itemprop="educationalAlignment" itemscope="itemscope" itemtype="schema.org/alignmentObject">\n';
            str +=  '\t\t<meta itemprop="educationalframework" content="' + ((checked_items[i].educationalAlignments[j].educationalAlignment != undefined)?checked_items[i].educationalAlignments[j].educationalAlignment:'') + '"></meta>\n';
            str +=  '\t\t<meta itemprop="alignmentType" content="' + ((checked_items[i].educationalAlignments[j].alignmentType != undefined)?checked_items[i].educationalAlignments[j].alignmentType:'') + '"></meta>\n';
            str +=  '\t\t<meta itemprop="targetDescription" content="' + ((checked_items[i].educationalAlignments[j].description != undefined)?checked_items[i].educationalAlignments[j].description.replace(/\"/g, "'"):'') + '"></meta>\n';
            str +=  '\t\t<meta itemprop="targetName" content="' + ((checked_items[i].educationalAlignments[j].dotNotation != undefined)?checked_items[i].educationalAlignments[j].dotNotation:'') + '"></meta>\n';
            str +=  '\t\t<meta itemprop="targetUrl" content="' + ((checked_items[i].educationalAlignments[j].itemURL != undefined)?checked_items[i].educationalAlignments[j].itemURL:'') + '"></meta>\n';
            str +=  '\t</meta>\n';
        }

        str +=  '</meta>\n\n';

    }
    return str;
}
