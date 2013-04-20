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

// Used by the alignment reader in order to get information out of the files
function processDataForAlignmentArray(allText, jsonStandards)	{

  var lines = allText.split(/\n|\r/);
  for (var i = 1; i < lines.length -1 ; i++) {
      var split = lines[i].split(',');
      alignmentArray.push({
          'title'         : split[2],
          'url'           : split[3],
          'description'   : split[0],
          'guid'          : split[4]
      });
      var notation = '["'+split[2].replace(/\./g,'"]["')+'"]';
      try {
        valed = eval("jsonStandards" + notation);  
        console.log('truth, bro');
        dotNotationDisplayArray.push(split[2]);
      }   
      catch (e) {
         // statements to handle any exceptions
      }   
  }
}
