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

/* Validate the very top row and make sure the headers are present exactly as they need to be and in the right order
 * or fail and give an error as they have the wrong file or something.
 */
function validateImportHeaders(importedContent) {
    var firstRow = importedContent[0];
    var importedVersion = firstRow[0];

    if (importedVersion == 'Metadata:') {
        // These are the valid first row values for this version of the file
        validValues = ["Metadata:","Title","URL","Time Required (FORMAT: P0Y0M0W0DT0H0M0S) ISO8601","Topic","Created (FORMAT: YYYY-MM-DD)","Creator","Publisher","Language","Mediatype","Use Rights URL","Is based on  URL","Intended End User Role","Educational Use","Typical Age Range","Interactivity Type","Learning Resource Type","Educational Alignment","Alignment Type","Dot Notation","Target URL","Target Description","Group Type","Thumbnail URL","Tag Description"];
        // Compare them
        compareValueEquals(firstRow, validValues, 'There appears to be a value comparison error in the firstRow headers preventing Tagger from knowing if this is a valid file');
        
    } else {
        fileHasErrors = true;
        fileErrors.push("<strong>Invalid file imported</strong><br /> The file you attempted to import doesn't appear to have the correct header identifier ('"+importedVersion+"' was  sent, it should be 'Metadata:') for this version of Tagger (v1.1).<br /><br />");
    }

}

/* Validate the number of columns and do any other column level validation needed
 *
 */
function validateImportColumns(importedContent) {
    var firstRow = importedContent[0];
    var importedVersion = firstRow[0];
    if (importedVersion == 'Metadata:') {
        if (importedContent.length > 1) {
            for (i in importedContent) {
                if (importedContent[i].length != 25 && importedContent[i].length != 0) {
                    fileHasErrors = true;
                    fileErrors.push("<strong>Invalid file imported</strong><br /> The file you attempted to import doesn't appear to have the correct number of columns in row #"+i+" (There appear to be '"+importedContent[i].length+"', it should be '25') for this version of Tagger (v1.1).<br /><br />");
                }
            }
        } else {
            fileHasErrors = true;
            fileErrors.push("<strong>Empty file imported</strong><br /> The file you attempted to import doesn't appear to have any content in it.<br /><br />");
        }
    }
}

/* The validate import function will take the input for a named field and try its best to make the value match a legal
 * value for that field. Legal values are the suggested values if there are any, and if it can't it just acceps the data
 * which will go into the other portion of the field or appended to the end.
 */
function validateImportField(field, value) {
    if (value == undefined) value = "";
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
            if (value != undefined && value != "") {
                tValue = value.toLowerCase();
                // Catch and Replace any well intentioned names, but incorrect
                tValue = tValue.replace(/^en$/,'EN_US');
                tValue = tValue.replace(/^english$/,'EN_US');
                tValue = tValue.replace(/^engrish$/,'EN_US'); // heh
                tValue = tValue.replace(/^spanish$/,'ES_ES');
                tValue = tValue.replace(/^es$/,'ES_ES');
                tValue = tValue.replace(/^espanol$/,'ES_ES');
                tValue = tValue.replace(/^español$/,'ES_ES');
                // Valid options
                validOptions = ['EN_US','ES_ES'];
                // Filter value
                tValue = tValue.toUpperCase();        // en-US to EN-US
                tValue = tValue.replace('-','_');     // EN-US to EN_US
                // Set results
                if ($.inArray(tValue, validOptions) == -1) {
                    fileHasErrors = true;
                    fileErrors.push('<strong>Invalid file imported -- <em>&quot;Language&quot;</em></strong><br /> It appears the sent language value is incorrect: "'+tValue+'" -- Valid Options: "'+validOptions.join()+'"<br /><br />');
                } else {
                    results = tValue;
                }                
            } 
            break;

        // Created on Date
        case 'createdOn':
            if (value != undefined && value != "") {
                var d = new Date(value);
                if (isNaN(d) || d.getMonth() == 0 || d.getDate() == 0 || d.getFullYear() == 0) {
                    fileHasErrors = true;
                    fileErrors.push("<strong>Invalid file imported -- <em>&quot;Created On&quot;</em></strong><br /> It would appear you're attempting to import a file that is containing a &quot;Created On&quot; date that is an invalid ISO8601 value.  Value sent: &quot;"+value+"&quot;<br /><br />");
                } else {
                    results = (((d.getMonth()+1)<10)?'0'+(d.getMonth()+1):(d.getMonth()+1)) + '-' +
                        ((d.getDate()<10)?'0'+ d.getDate(): d.getDate()) + '-' + d.getFullYear();
                }
            }
            break;

        // End user enums
        case 'endUser':
            if (value != undefined && value != "") {
                // Valid options
                validOptions = ["Administrator","Mentor","Parent","Peer Tutor","Specialist","Student","Teacher","Team"];
                // Check values                
                results = checkCSVValuesForValidOptions('End User', validOptions, value );
            }
            break;

        // Age Range
        case 'ageRange':
            if (value != undefined && value != "") {
                // Valid Options
                validOptions = ["0-2","3-5","5-8","8-10","10-12","12-14","14-16","16-18","18+"];
                // Check values                
                results = checkCSVValuesForValidOptions('Age Range', validOptions, value );
            }
            break;      
        
        // Educational Use
        case 'educationalUse':
            if (value != undefined && value != "") {
                // Valid Options
                validOptions = ["Activity","Analogies","Assessment","Auditory","Brainstorming","Classifying","Comparing","Cooperative Learning","Creative Response","Demonstration","Differentiation","Discovery Learning","Discussion/Debate","Drill & Practice","Experiential","Field Trip","Game","Generating Hypotheses","Guided Questions","Hands-on","Homework","Identify Similarities & Differences","Inquiry","Interactive","Interview/Survey","Interviews","Introduction","Journaling","Kinesthetic","Laboratory","Lecture","Metaphors","Model & Simulation","Musical","Nonlinguistic","Note Taking","Peer Coaching","Peer Response","Play","Presentation","Problem Solving","Problem Based","Project","Questioning","Reading","Reciprocal Teaching","Reflection","Reinforcement","Research","Review","Role Playing","Service Learning","Simulations","Summarizing","Technology","Testing Hypotheses","Thematic Instruction","Visual/Spatial","Word Association","Writing"];                

                // Check values
                results = checkCSVValuesForValidOptions('Educational Use', validOptions, value );
            }
            break;
        
        // Interactivity Type
        case 'interactivityType':
            if (value != undefined && value != "") {
                // Valid Options
                validOptions = ["Active","Expositive","Mixed"];
                // Check values
                results = checkCSVValuesForValidOptions('Interactivity Type', validOptions, value );
            }
            break;

        // Learning Resource Type
        case 'learningResourceType':
            if (value != undefined && value != "") {
                // Valid Options
                validOptions = ["Activity","Assessment","Audio","Broadcast","Calculator","Discussion","E-Mail","Field Trip","Hands-on","In-person/Speaker","Kinesthetic","Lab Material","Lesson Plan","Manipulative","MBL (Microcomputer Based)","Model","On-Line","Podcast","Presentation","Printed","Quiz","Robotics","Still Image","Test","Video","Wiki","Worksheet"];                
                // Check values
                results = checkCSVValuesForValidOptions('Learning Resource Type', validOptions, value );
            }
            break;
    
        // Media Type
        case 'mediaType':
            if (value != undefined && value != "") {
                // Valid Options
                validOptions = ["Audio CD","Audiotape","Calculator","CD-I","CD-ROM","Diskette","Duplication Master","DVD/Blu-ray","E-Mail","Electronic Slides","Field Trip","Filmstrip","Flash","Image","In-person/Speaker","Interactive Whiteboard","Manipulative","MBL (Microcomputer Based)","Microfiche","Overhead","Pamphlet","PDF","Person-to-Person","Phonograph Record","Photo","Podcast","Printed","Radio","Robotics","Satellite","Slides","Television","Transparency","Video Conference","Videodisc","Webpage","Wiki"];
                // Check values
                results = checkCSVValuesForValidOptions('Media Type', validOptions, value );
            }
            break;
        
        // Group Type
        case 'groupType':
            if (value != undefined && value != "") {
                // Valid Options
                validOptions = ["Class","Community","Grade","Group Large (6+ Members)","Group Small (3-5 Members)","Individual","Inter-generational","Multiple Class","Pair","School","State/Province","World"];
                // Check values
                results = checkCSVValuesForValidOptions('Group Type', validOptions, value );
            }
            break;
        
        // Time required MUST conform to ISO8601 or be empty.  The end.
        case 'timeRequired':
            if (value != undefined && value != "") {
                // Parse out the time required into results
                if (!nezasa.iso8601.Period.isValid(value)) {
                    results = "";
                    fileHasErrors = true;
                    fileErrors.push("<strong>Invalid file imported -- <em>&quot;Time Required&quot;</em></strong><br /> It would appear you're attempting to import a file with an invalid ISO8601 &quot;Time Required&quot; value.  Value sent &quot;"+value+"&quot;<br /><br />");
                } else {
                    parsedTimeRequired = nezasa.iso8601.Period.parse(value);
                    parsedTimeRequired[0] = "P" + parsedTimeRequired[0] + "Y";
                    parsedTimeRequired[1] = parsedTimeRequired[1] + "M";
                    parsedTimeRequired[2] = parsedTimeRequired[2] + "W";
                    parsedTimeRequired[3] = parsedTimeRequired[3] + "D";
                    parsedTimeRequired[4] = "T" + parsedTimeRequired[4] + "H";
                    parsedTimeRequired[5] = parsedTimeRequired[5] + "M";
                    parsedTimeRequired[6] = parsedTimeRequired[6] + "S";

                    results = parsedTimeRequired.join('');
                }

            }
            break;
    }

    return results;
}

// Return an object based on the imported dot notation
// But first make sure it is a valid dot notation etc..
function validateImportEducationalAlignment(importedObject) {
    // Valid Options
    var validOptions = ["Teaches","Assesses","Requires"];
    // Check values
    checkCSVValuesForValidOptions('Alignment Type', validOptions, importedObject['alignmentType'], true);
    // Make sure the dot notation is in the list
    var dotNotationArrayLocation = $.inArray(importedObject['dotNotation'], dotNotationDisplayArray);
    // Is this a valid dotnotation?
    if (dotNotationArrayLocation != -1) {
        var parts = importedObject['dotNotation'].split('.');
        if (parts[0].toUpperCase() == 'CCSS') {
            importedObject['educationalAlignment'] = "Common Core State Standards";
        }
    }
    return importedObject;
}

// Dry way to check field csv values against the known valid options for that field
function checkCSVValuesForValidOptions(field, validOptions, value, denyOther) {
    // Pushed result values
    resValues = [];
    // Filter values by splitting them out
    tValues = value.toLowerCase(); // Lower case
    tValues = tValues.split(','); // Split by comma
    for (t in tValues) {
        tValue = $.trim(tValues[t]); // Trim spaces
        tValue = toCorrectCase(tValue);

        if ($.inArray(tValue, validOptions) == -1 && denyOther == true) {
            fileHasErrors = true;
            fileErrors.push('<strong>Invalid file imported -- <em>"'+field+'"</em></strong><br /> Value set: "'+tValue+'" -- Valid Options: "'+validOptions.join()+'"<br /><br />');
        } else {
            resValues.push(tValue);
        }
    }
    return resValues.join(',');
}

// Case Correction
function toCorrectCase(string) {
    var res = ""
    // First catch the special ones that for some reason don't follow the standard rules.
    if (string == 'on-line')    res = 'On-Line';
    if (string == 'cd-rom')     res = 'CD-ROM';
    if (string == 'cd-i')       res = 'CD-I';
    if (string == 'pdf')        res = 'PDF';
    if (string == 'e-mail')     res = 'E-Mail';
    if (string == 'audio cd')   res = 'Audio CD';
    if (string == 'dvd/blu-ray') res = 'DVD/Blu-ray';
    if (string == 'mbl (microcomputer based)') res = 'MBL (Microcomputer Based)';
    if (string == 'person-to-person') res = 'Person-to-Person';

    if (res == "") {
        // Capitalize first character after space
        var strArray = string.split(/\s/);
        for (i in strArray) {
            strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
        }
        res = strArray.join(' ');
        // Now first character after /
        var strArray = res.split(/\//);
        for (i in strArray) {
            strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
        }
        res = strArray.join('/');
    }

    return res;
}

// Helper function for comparing values or throwing.  Can take strings or arrays
function compareValueEquals(askedValue,validValue,errorMessage) {
    if (typeof askedValue == "string") {
        if (askedValue.toLowerCase() != validValue.toLowerCase()) {
            fileHasErrors = true;
            fileErrors.push("<strong>Invalid file imported</strong><br /> "+errorMessage+": '"+askedValue+"' is not equals to the correct value of '"+validValue+"'<br /><br />");
        }
    } else if (typeof askedValue == "object") {
        for (i in validValue) {
            if (askedValue[i] == undefined || askedValue[i].toLowerCase() != validValue[i].toLowerCase()) {
                fileHasErrors = true;

                if (askedValue[i] == undefined) {
                    fileErrors.push("<strong>Invalid file imported</strong><br /> "+errorMessage+": '"+validValue[i]+"' appears to be missing entirely<br /><br />");
                } else {
                    fileErrors.push("<strong>Invalid file imported</strong><br /> "+errorMessage+": '"+askedValue[i]+"' is not equals to the correct value of '"+validValue[i]+"'<br /><br />");
                }
            }
        }
    }
}

// Useful message thrower
function showFileHasErrorsMessage(headerMsg) {
    if (fileHasErrors) {
        var message = "Data could not be imported.  The file you're attempting to import appears to have some errors in rows or columns that Tagger does not understand.  This is usually as a result of data that doesn't conform to requirements for each column of data.<br />Before Tagger can import this file, please correct the following errors.<br /><br />" + fileErrors.join('');
        showMessage(message, "Import Errors! :: "+headerMsg);
    }
}