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

function toggleForm() {
    if ($("#multiItemSelector input[type=checkbox]:checked").length > 0) {
        $("#LRMIData input,#LRMIData select,#LRMIData textarea").removeAttr("disabled");
        $("#educationTab,#alignmentTab").removeClass("disabled");
        $("#educationTab a,#alignmentTab a").attr('data-toggle', 'tab');
    } else {
        $("#LRMIData input,#LRMIData select,#LRMIData textarea").attr("disabled","disabled");
        $("#educationTab,#alignmentTab").addClass("disabled");
        $("#educationTab a,#alignmentTab a").removeAttr("data-toggle");
    }
}