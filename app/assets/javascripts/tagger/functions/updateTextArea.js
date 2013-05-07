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

// Updates the text area in the output tab
function updateTextArea(){
  var textAreaValue = "";

  $("#multiItemSelector input[type=checkbox]:checked").not('.deleted').each(function(i,obj) {

    if (items[obj.id] != undefined) {

      if (items[obj.id].title != undefined && items[obj.id].title != "") {
        textAreaValue += "Title:\n"+items[obj.id].title+"\n";
      }
      if (items[obj.id].url != undefined && items[obj.id].url != "") {
        textAreaValue += "URL:\n"+items[obj.id].url+"\n";
      }
      if (items[obj.id].tagDescription != undefined && items[obj.id].tagDescription != "") {
        textAreaValue += "Description:\n"+items[obj.id].tagDescription+"\n";
      }
      if (items[obj.id].language != undefined && items[obj.id].language != "") {
        textAreaValue += "Language:\n"+items[obj.id].language+"\n";
      }
      if (items[obj.id].createdOn != undefined && items[obj.id].createdOn != "") {
        textAreaValue += "Created On:\n"+items[obj.id].createdOn+"\n";
      }
      if (items[obj.id].topic != undefined && items[obj.id].topic != "") {
        textAreaValue += "Topic/Subject:\n"+items[obj.id].topic+"\n";
      }
      if (items[obj.id].createdBy != undefined && items[obj.id].createdBy != "") {
        textAreaValue += "Created By:\n"+items[obj.id].createdBy+"\n";
      }
      if (items[obj.id].usageRightsURL != undefined && items[obj.id].usageRightsURL != "") {
        textAreaValue += "Usage Rights URL:\n"+items[obj.id].usageRightsURL+"\n";
      }
      if (items[obj.id].publisher != undefined && items[obj.id].publisher != "") {
        textAreaValue += "Publisher:\n"+items[obj.id].publisher+"\n";
      }
      if (items[obj.id].isBasedOnURL != undefined && items[obj.id].isBasedOnURL != "") {
        textAreaValue += "Is Based On URL:\n"+items[obj.id].isBasedOnURL+"\n";
      }
      if (items[obj.id].endUser != undefined && items[obj.id].endUser != "") {
        textAreaValue += "End User:\n"+items[obj.id].endUser+"\n";
      }
      if (items[obj.id].ageRange != undefined && items[obj.id].ageRange != "") {
        textAreaValue += "Age Range:\n"+items[obj.id].ageRange+"\n";
      }
      if (items[obj.id].educationalUse != undefined && items[obj.id].educationalUse != "") {
        textAreaValue += "Educational Use:\n"+items[obj.id].educationalUse+"\n";
      }
      if (items[obj.id].interactivityType != undefined && items[obj.id].interactivityType != "") {
        textAreaValue += "Interactivity Type:\n"+items[obj.id].interactivityType+"\n";
      }
      if (items[obj.id].learningResourceType != undefined && items[obj.id].learningResourceType != "") {
        textAreaValue += "Learning Res Type:\n"+items[obj.id].learningResourceType+"\n";
      }
      if (items[obj.id].mediaType != undefined && items[obj.id].mediaType != "") {
        textAreaValue += "Media Type:\n"+items[obj.id].mediaType+"\n";
      }
      if (items[obj.id].groupType != undefined && items[obj.id].groupType != "") {
        textAreaValue += "Group Type:\n"+items[obj.id].groupType+"\n";
      }
      if (items[obj.id].timeRequired != "P0Y0M0W0DT0H0M0S") {
        textAreaValue += "Time Required:\n"+items[obj.id].timeRequired+"\n\n";
      }

      if (items[obj.id].educationalAlignments != undefined) {
        for (j in items[obj.id].educationalAlignments){
          if (items[obj.id].educationalAlignments[j].educationalAlignment != undefined && items[obj.id].educationalAlignments[j].educationalAlignment != "") {
            textAreaValue += "Educational Alignment:\n"+ items[obj.id].educationalAlignments[j].educationalAlignment+"\n";
          }
          if (items[obj.id].educationalAlignments[j].alignmentType != undefined && items[obj.id].educationalAlignments[j].alignmentType != "") {
            textAreaValue += "Alignment Type:\n"+ items[obj.id].educationalAlignments[j].alignmentType+"\n";
          }
          if (items[obj.id].educationalAlignments[j].dotNotation != undefined && items[obj.id].educationalAlignments[j].dotNotation != "") {
            textAreaValue += "Dot Notation:\n"+ items[obj.id].educationalAlignments[j].dotNotation+"\n";
          }
          if (items[obj.id].educationalAlignments[j].itemURL != undefined && items[obj.id].educationalAlignments[j].itemURL != "") {
            textAreaValue += "Item URL:\n"+ items[obj.id].educationalAlignments[j].itemURL+"\n";
          }
          if (items[obj.id].educationalAlignments[j].description != undefined && items[obj.id].educationalAlignments[j].description != "") {
            textAreaValue += "Description:\n"+ items[obj.id].educationalAlignments[j].description+"\n";
          }
        }
      }
      textAreaValue += "\n-----------------------\n\n";

    }

  });

  $("#textarea").val(textAreaValue);
}
