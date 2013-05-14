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

// If checked then only return those that are checked
// If an iterationsize is sent (only if checked) then return them in an array of groups
function processJSONOutput(checked,iterationSize) {
  // If not checked then everything!
  if (checked == undefined) {
    return JSON.stringify(items);

  // Else only return those checked
  } else {
    var checked_items = {};

    // If no iteration size then just return all checked
    if (iterationSize == undefined) {
      $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
        checked_items[obj.id] = items[obj.id];
      });

      return JSON.stringify(checked_items);

    // Else create an array object with each of the stringified groups
    } else {
      var iterationCounter = 0;
      var iterationGroup = 0;
      var item_groups = [];
      $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
        if (iterationCounter >= iterationSize) {
          iterationCounter = 0;
          iterationGroup++;
          item_groups.push(JSON.stringify(checked_items));
          checked_items = {};
        }
        checked_items[obj.id] = items[obj.id];
        iterationCounter++;
      });
      item_groups.push(JSON.stringify(checked_items));

      return item_groups;
    }

  }
}