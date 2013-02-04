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
            if (value != undefined && value != "") {
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
        
        
        case 'timeRequired':
            break;
        case 'educationalAlignments':
            break;

    }

    return results;
}

// Dry way to check field csv values against the known valid options for that field
function checkCSVValuesForValidOptions(field, validOptions, value) { 
    // Pushed result values
    resValues = [];
    // Filter values by splitting them out
    tValues = value.toLowerCase(); // Lower case
    tValues = tValues.split(','); // Split by comma
    for (t in tValues) {
        tValue = $.trim(tValues[t]); // Trim spaces
        tValue = toCorrectCase(tValue);

        if ($.inArray(tValue, validOptions) == -1) {
            fileHasErrors = true;
            fileErrors.push('<strong>Invalid option in <em>"'+field+'"</em> column.</strong><br /> Value set: "'+tValue+'" -- Valid Options: "'+validOptions.join()+'"<br /><br />');
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