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

function clearTimeRequired() {

    // Clear the visible values
    $( "#slideryears" ).slider({value:0});
    $( "#slidermonths" ).slider({value:0});
    $( "#sliderweeks" ).slider({value:0});
    $( "#sliderdays" ).slider({value:0});
    $( "#sliderhours" ).slider({value:0});
    $( "#sliderminutes" ).slider({value:0});
    $( "#sliderseconds" ).slider({value:0});

    // Clear the visible values
    $( "#amountyears" ).html("Year");
    $( "#amountmonths" ).html("Month");
    $( "#amountweeks" ).html("Week");
    $( "#amountdays" ).html("Day");
    $( "#amounthours" ).html("Hour");
    $( "#amountminutes" ).html("Minute");
    $( "#amountseconds" ).html("Second");

}