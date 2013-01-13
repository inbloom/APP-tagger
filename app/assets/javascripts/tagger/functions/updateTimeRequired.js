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

function updateTimeRequired(period){

    if (period != undefined) {
        var objName = "timeRequired";

        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {

            var vals = items[obj.id][objName].match(/(\d+)/g);

            items[obj.id][objName] = "P" +
                ((period == 'Year')   ? $("#slideryears").slider("value")   :vals[0]) + "Y" +
                ((period == 'Month')  ? $("#slidermonths").slider("value")  :vals[1]) + "M" +
                ((period == 'Week')   ? $("#sliderweeks").slider("value")   :vals[2]) + "W" +
                ((period == 'Day')    ? $("#sliderdays").slider("value")    :vals[3]) + "DT" +
                ((period == 'Hour')   ? $("#sliderhours").slider("value")   :vals[4]) + "H" +
                ((period == 'Minute') ? $("#sliderminutes").slider("value") :vals[5]) + "M" +
                ((period == 'Second') ? $("#sliderseconds").slider("value") :vals[6]) + "S";

        });

        updateTextArea();
    }

}
