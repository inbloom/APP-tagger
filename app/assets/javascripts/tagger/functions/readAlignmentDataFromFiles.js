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

var jsonStandards;
function readAlignmentDataFromFiles() {
  $.ajax({
      type: "GET",
      url: "ccss-sorted.json",
      dataType: "json",
      success: function(data) {
        jsonStandards = data;
        processStandardsIntoAutocomplete(jsonStandards);
      }
  });

}

var jsonStandardsArray = [];
function processStandardsIntoAutocomplete(standard, res) {
  // define res if its not yet defined in this iteration
  if (res == undefined) res = '';
  // get the child keys
  var keys = Object.keys(standard);
  for (k in keys) {
    // for the key make sure its a real value
    if (  keys[k] == undefined ||
          typeof standard[keys[k]] != "object" ||
          keys[k].charAt(0) == '_') continue;
    // save the iteration results
    var iteration = processStandardsIntoAutocomplete(standard[keys[k]], res + keys[k] + '.');
    // if the iteration results don't suck, then add them to the list
    if (iteration != undefined) {
      // Add it to the list!
      res += iteration;
    }
  }
  if (res != '') {
    // Strip last dot
    res = res.substr(0,res.length-1);
    // Convert to a real notation
    var notation = '["'+res.replace(/\./g,'"]["')+'"]';
    try {
      valed = eval("jsonStandards" + notation);
      // Now test to see if this dot notation has a _text value, and if it does push it!
      if (valed._text != undefined) {
        // Push to array stripping last dot
        jsonStandardsArray.push(res);
      }
    }
    catch (e) {
      // not sure what error to do here if any at all..
      // this would only fire if we tried to eval out a bad notation which is kind of a self solving problem.. so do nothing
    }
  }
}

