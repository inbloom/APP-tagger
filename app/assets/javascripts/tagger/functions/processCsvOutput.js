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

function processCSVOutput(){
    var str = '"Metadata:","Title","URL","Time Required (FORMAT: P0Y0M0W0DT0H0M0S) ISO8601","Topic","Created (FORMAT: YYYY-MM-DD)","Creator","Publisher","Language","Mediatype","Use Rights URL","Is based on  URL","Intended End User Role","Educational Use","Typical Age Range","Interactivity Type","Learning Resource Type","Educational Alignment","Alignment Type","Dot Notation","Target URL","Target Description","Group Type","Thumbnail URL","Tag Description"\n';

    for (i in items) {
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

        var alignmentString1 = '"';
        var alignmentString2 = '"';
        var alignmentString3 = '"';
        var alignmentString4 = '"';
        var alignmentString5 = '"';

        for (j in items[i].educationalAlignments) {
            alignmentString1 += items[i].educationalAlignments[j].educationalAlignment.replace(/,/g, '') + ',';
            alignmentString2 += items[i].educationalAlignments[j].alignmentType.replace(/,/g, '') + ',';
            alignmentString3 += items[i].educationalAlignments[j].dotNotation.replace(/,/g, '') + ',';
            alignmentString4 += items[i].educationalAlignments[j].itemURL.replace(/,/g, '') + ',';
            alignmentString5 += items[i].educationalAlignments[j].description.replace(/\"/g, "'").replace(/,/g, '') + ',';
        }
        alignmentString1 += '"';
        alignmentString2 += '"';
        alignmentString3 += '"';
        alignmentString4 += '"';
        alignmentString5 += '"';

        str = str + alignmentString1 + ',' + alignmentString2 + ',' + alignmentString3 + ',' + alignmentString4 + ',' + alignmentString5 + ',';

        str = str + '"' + items[i].groupType.replace(/\"/g, "'") + '"';
        str = str + '"' + items[i].thumbnail.replace(/\"/g, "'") + '"';
        str = str + '"' + items[i].tagDescription.replace(/\"/g, "'") + '"';

        str = str + '\n';

    }

    return str;
}