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

// Take the comma separated list for {field} from {item}.{field} and populate the select#{field} box
// Any of the values in the comma separated list for {field} that doesn't have an option in select#{field}
// Get stuffed into {field}Other as it's own comma separated list.
function setupDisplayFieldsEducationTab(item, field) {
    if (item[field] != undefined && item[field] != '' && $('select#'+field)[0] != undefined) {
        var itemOptions = item[field].split(',');
        $('select#'+field+' option').each(function() {
            if ($.inArray($(this).val(),itemOptions) !== -1) {
                $(this).attr('selected',true);
            }
        });
        var selectOptions = $('select#'+field+' option').map(function() { return this.value });
        var otherOptions = [];
        for (i in itemOptions) {
            if ($.inArray(itemOptions[i], selectOptions) === -1) {
                otherOptions.push(itemOptions[i]);
            }
        }
        if (otherOptions.length > 0) {
            $('#'+field+'Other').attr('value',otherOptions.join(','));
        }
    }
}
