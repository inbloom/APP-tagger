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

function validateAlignmentForm() {

  default_values = new Array;

  $(".required").each( function (k,v) { default_values[k] = v.value } );

  req_all = default_values.length

  filled_out_values = $.grep(default_values,function(n){ return(n) });

  filled_out_values = $.grep(filled_out_values, function(value) {
    return value != 'Alignment Type...';
  });

  filled_out_values = $.grep(filled_out_values, function(value) {
    return value != 'Loading (please wait)....';
  });

  req_filled = filled_out_values.length

  if ((req_filled > 0) && (req_all == req_filled)) {
    $("#addButton").removeAttr("disabled");
  } else {
    $("#addButton").attr("disabled", "disabled");
  }

}