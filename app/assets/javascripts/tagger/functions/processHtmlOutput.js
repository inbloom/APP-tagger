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

function processHTMLOutput(){
    str = "";
    for (i in items) {

        str += '<meta itemscope="itemscope" itemtype="http://schema.org/CreativeWork">\n';
        str +=  '\t<meta itemprop="inLanguage" content="' + items[i].language + '"></meta>\n';
        str +=  '\t<meta itemprop="name" content="' + items[i].title.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t<meta itemprop="url" content="' + items[i].url + '"></meta>\n';
        str +=  '\t<meta itemprop="about" content="' + items[i].topic.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t<meta itemprop="dateCreated" content="' + items[i].createdOn + '"></meta>\n';
        str +=  '\t<meta itemprop="thumbnailUrl" content=""></meta>\n';

        str +=  '\t<meta itemprop="author" itemtype="http://schema.org/Person" itemscope="itemscope">\n';
        str +=  '\t\t<meta imemprop="name" content="' + items[i].createdBy.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t</meta>\n';

        str +=  '\t<meta itemprop="publisher" itemtype="http://schema.org/Organization" itemscope="itemscope">\n';
        str +=  '\t\t<meta imemprop="name" content="' + items[i].publisher.replace(/\"/g, "'") + '"></meta>\n';
        str +=  '\t</meta>\n';

        str +=  '\t<meta itemprop="useRightsURL" content="' + items[i].usageRightsURL + '"></meta>\n';
        str +=  '\t<meta itemprop="isBasedOnURL" content="' + items[i].isBasedOnURL + '"></meta>\n';
        str +=  '\t<meta itemprop="timeRequired" content="' + items[i].timeRequired + '"></meta>\n';

        var string = items[i].endUser.replace(/\"/g, "'");
        var array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="intendedEndUserRole" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].ageRange.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="typicalAgeRange" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].educationalUse.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="educationalUse" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].interactivityType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="interactivityType" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].learningResourceType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="learningResourceType" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].mediaType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="mediaType" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].groupType.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="groupType" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].thumbnail.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="thumbnail" content="' + array[j] + '"></meta>\n';
        }

        string = items[i].tagDescription.replace(/\"/g, "'");
        array = string.split(',');
        for (j = 0; j < array.length; j++){
            str +=  '\t<meta itemprop="tagDescription" content="' + array[j] + '"></meta>\n';
        }

        for (j in items[i].educationalAlignments) {
            str +=  '\t<meta itemprop="educationalAlignment" itemscope="itemscope" itemtype="schema.org/alignmentObject">';
            str +=  '\t\t<meta itemprop="name" content="' + items[i].educationalAlignments[j].educationalAlignment + '"></meta>\n';
            str +=  '\t\t<meta itemprop="alignmentType" content="' + items[i].educationalAlignments[j].alignmentType + '"></meta>\n';
            str +=  '\t\t<meta itemprop="targetDescription" content="' + items[i].educationalAlignments[j].description.replace(/\"/g, "'") + '"></meta>\n';
            str +=  '\t\t<meta itemprop="targetName" content="' + items[i].educationalAlignments[j].dotNotation + '"></meta>\n';
            str +=  '\t\t<meta itemprop="targetUrl" content="' + items[i].educationalAlignments[j].itemURL + '"></meta>\n';
            str +=  '\t</meta>\n';
        }

        str +=  '</meta>\n';

    }
    return str;
}
