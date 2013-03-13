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

function processCSVOutput(checked){
    var checked_items = {};
    if (checked == undefined) {
        checked_items = items;
    } else {
        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            checked_items[obj.id] = items[obj.id]
        });
    }
    var str = 'Metadata:,Title,URL,Time Required (FORMAT: P0Y0M0W0DT0H0M0S) ISO8601,Topic,Created (FORMAT: YYYY-MM-DD),Creator,Publisher,Language,Mediatype,Use Rights URL,Is based on  URL,Intended End User Role,Educational Use,Typical Age Range,Interactivity Type,Learning Resource Type,Educational Alignment,Alignment Type,Dot Notation,Target URL,Target Description,Group Type,Thumbnail URL,Tag Description\n';

    for (i in checked_items) {
        str = str + ',';
        str = str + wrapIfNeeded(checked_items[i].title) + ',';
        str = str + wrapIfNeeded(checked_items[i].url) + ',';
        str = str + wrapIfNeeded(checked_items[i].timeRequired) + ',';
        str = str + wrapIfNeeded(checked_items[i].topic) + ',';
        str = str + wrapIfNeeded(checked_items[i].createdOn) + ',';
        str = str + wrapIfNeeded(checked_items[i].createdBy) + ',';
        str = str + wrapIfNeeded(checked_items[i].publisher) + ',';
        str = str + wrapIfNeeded(checked_items[i].language) + ',';
        str = str + wrapIfNeeded(checked_items[i].mediaType) + ',';
        str = str + wrapIfNeeded(checked_items[i].usageRightsURL) + ',';
        str = str + wrapIfNeeded(checked_items[i].isBasedOnURL) + ',';
        str = str + wrapIfNeeded(checked_items[i].endUser) + ',';
        str = str + wrapIfNeeded(checked_items[i].educationalUse) + ',';
        str = str + wrapIfNeeded(checked_items[i].ageRange) + ',';
        str = str + wrapIfNeeded(checked_items[i].interactivityType) + ',';
        str = str + wrapIfNeeded(checked_items[i].learningResourceType) + ',';

        var alignmentString1 = '';
        var alignmentString2 = '';
        var alignmentString3 = '';
        var alignmentString4 = '';
        var alignmentString5 = '';

        for (j in checked_items[i].educationalAlignments) {
            alignmentString1 += wrapIfNeeded(checked_items[i].educationalAlignments[j].educationalAlignment) + ',';
            alignmentString2 += wrapIfNeeded(checked_items[i].educationalAlignments[j].alignmentType) + ',';
            alignmentString3 += wrapIfNeeded(checked_items[i].educationalAlignments[j].dotNotation) + ',';
            alignmentString4 += wrapIfNeeded(checked_items[i].educationalAlignments[j].itemURL) + ',';
            alignmentString5 += wrapIfNeeded(checked_items[i].educationalAlignments[j].description) + ',';
        }

        str = str + alignmentString1 + ',' + alignmentString2 + ',' + alignmentString3 + ',' + alignmentString4 + ',' + alignmentString5 + ',';

        str = str + wrapIfNeeded(checked_items[i].groupType) + ',';
        str = str + wrapIfNeeded(checked_items[i].thumbnail) + ',';
        str = str + wrapIfNeeded(checked_items[i].tagDescription);

        str = str + '\r\n';

    }

    return str;
}

function wrapIfNeeded(str) {
    if (/"/.test(str) || /,/.test(str)) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}