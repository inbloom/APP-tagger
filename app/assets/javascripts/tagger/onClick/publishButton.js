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

  $("#publishButton").click( function() {
    if (!$(this).hasClass('disabled')) {
      showPleaseWait('Publishing ' + ($("#multiItemSelector input[type=checkbox]:checked").length) + ' Resources -- Saving UI State First... <br /><br /><small>Note: This can take some time depending on the number of resources you have selected..</small> ');

      var str = processJSONOutput();
      saveDraft(str, true);

    }
  });

});
