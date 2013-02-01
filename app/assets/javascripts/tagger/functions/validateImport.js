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
/* The validate import function will take the input for a named field and try its best to make the value match a legal
 * value for that field.  If it cant it will set an error and return an empty string.
 */
function validateImport(field, value) {
    var results = "";

    switch(field) {
        // No validation required
        case 'title':
        case 'topic':
        case 'tagDescription':
        case 'thumbnail':
        case 'url':
        case 'usageRightsURL':
        case 'isBasedOnURL':
        case 'publisher':
        case 'createdBy':
            results = value;
            break;

        // Language code
        case 'language':
            if (value != '') {
                // Valid options
                validOptions = ['EN_US','ES_ES'];
                // Filter value
                tValue = value.toUpperCase();         // en-US to EN-US
                tValue = tValue.replace('-','_');     // EN-US to EN_US
                // Set results
                if ($.inArray(tValue, validOptions) == -1) {
                    fileHasErrors = true;
                    fileErrors.push('Invalid Language: "'+tValue+'" -- Options: "'+validOptions.join()+'"');
                } else {
                    results = tValue;
                }                
            } 
            break;

        // Created on Date
        case 'createdOn':

            break;

        // End user enums
        case 'endUser':
            if (value != '') {
                // Valid options
                validOptions = ["Administrator","Mentor","Parent","Peer Tutor","Specialist","Student","Teacher","Team"];
                // Pushed result values
                resValues = [];
                // Filter values by splitting them out
                tValues = value.toLowerCase(); // Lower case
                tValues = tValues.split(','); // Split by comma
                for (t in tValues) {
                    tValue = $.trim(tValues[t]); // Trim spaces
                    tValue = tValue.charAt(0).toUpperCase() + tValue.slice(1); // Capitalize

                    if ($.inArray(tValue, validOptions) == -1) {
                        fileHasErrors = true;
                        fileErrors.push('Invalid End User: "'+tValue+'" -- Options: "'+validOptions.join()+'"');
                    } else {
                        resValues.push(tValue);
                    }
                }
                results = resValues;
            }
            break;



        case 'ageRange':
            break;
        case 'educationalUse':
            break;
        case 'interactivityType':
            break;
        case 'learningResourceType':
            break;
        case 'mediaType':
            break;
        case 'groupType':
            break;
        case 'timeRequired':
            break;
        case 'educationalAlignments':
            break;

    }

    return results;
}
