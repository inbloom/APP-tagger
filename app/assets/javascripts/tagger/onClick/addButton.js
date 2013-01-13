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

    $("#addButton").click(function() {
        // Hide the modal
        $('#alignmentsModal').modal('hide');
        $('.noAlignmentsYet').hide();

        // Dig out the data
        var formEducationAlignment = $('#educationalAlignment').val();
        var formAlignmentType = $('#alignmentType').val();
        var formDotNotation = $('#dotNotation').val();
        var formDescription = $('#description').val();
        var formItemUrl = $('#itemURL').val();

        // Create our object
        var object = {
            'educationalAlignment' : formEducationAlignment,
            'alignmentType' : formAlignmentType,
            'dotNotation' : formDotNotation,
            'description' : formDescription,
            'itemURL' : formItemUrl
        };

        var objHash = objectToHash(object);

        // Okay add it.
        if (alignments[objHash] == undefined) {
            alignments[objHash] = object;
            //Updates the Alignment Table on the Alignment Tab
            if (formDotNotation == '') formDotNotation = 'N/A';
            $('#currentAlignmentTable > tbody:last').append('<tr><td><label class="checkbox"><input type="checkbox" class="alignment-checkbox" value="'+objHash+'" />'+ formDotNotation +'</label></td><td>'+ capitalize(formAlignmentType) +'</td></tr>');
        }

        updateTextArea();

        // Zero the form
        $('#alignmentType').val('');
        $('#dotNotation').val('');
        $('#description').val('');
        $('#itemURL').val('');
        $('#itemGUID').val('');

        return false;
    });

});