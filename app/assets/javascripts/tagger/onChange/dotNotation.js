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

$(function() {

  $("#dotNotation").change(function(e){
    // Nothing changed? then change nothing!
    if (e.target.value == typedDotNotation) {}
    else {
      // What did they type?
      typedDotNotation = $('#dotNotation').val();

      // Clear the form and under it
      $('#itemURL').val('');
      $('#description').html('');
      
      // Does the dot notation we are asking about exist in the array of dotnotations?
      if ($.inArray(e.target.value, jsonStandardsArray) == -1) {
        // No? Complain.
        $('#description').html("Error: The Dot Notation you entered doesn't appear to be valid.")
      } else {
        // Yes? Then try to parse it out if you can
        var notation = '["'+typedDotNotation.replace(/\./g,'"]["')+'"]';
        try {
          // Hey if we don't catch here, then it worked
          var valed = eval("jsonStandards" + notation);
          // Generate the URL.. this is hacky but we have no way to get the url so we parse it from the dot notation itself
          // Note this likely wont work for other systems but thankfully it does work for corestandards.org.. mostly
          var urled = typedDotNotation.replace(/\./g,'/').replace(/CCSS/g,'http://www.corestandards.org');
          // Set the url and description
          $('#itemURL').attr('value', urled);
          $('#description').html(valed._text);
        }
        catch (e) {
          // Doh! it doesn't exist or someone kicked a kitten somewhere, so give an error message.
          $('#description').html("Error: Unable to find the Dot Notation you entered in the known list.")
        }
      }
    }
  });

});