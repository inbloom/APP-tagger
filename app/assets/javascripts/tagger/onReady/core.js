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

    taggerVersion = '1.1.513H';

    window.itemCounter = 0;
    window.boxes = 0;
    window.currentAlignmentCounter = 0;
    window.currentAlignmentItem = 0;
    window.firtname = '';
    window.lastname = '';
    window.activeTab = null;
    window.previousDotValue = '';

    items = {};
    alignments = {};

    window.alignmentArray = new Array();
    window.dotNotationDisplayArray = new Array();

    readAlignmentDataFromFiles();

    clearTimeRequired();

    $.ajaxSetup({ cache: false });

    $('#pleasewait').hide();

    var $window = $( window );
    var $mainContentTopLeft = $( '#mainContentTopLeft' );
    var $mainContentTopRight = $( '#mainContentTopRight' );
    var $mainContentBottom = $ ( '#mainContentBottom' );
    var $textarea = $( '#textarea' );
    var $endUser = $( '#endUser');
    var $ageRange = $( '#ageRange');
    var $educationalUse = $( '#educationalUse');
    var $interactivityType = $( '#interactivityType');
    var $learningResourceType = $( '#learningResourceType');
    var $mediaType = $( '#mediaType');
    var $groupType = $( '#groupType');
    var $timeRequired = $( '#timeRequired');
    var $dotNotation = $( '#dotNotation');
    var $createdOn = $( '#createdOn');

    var offsetTopPanels = $('#mainContentTopLeft').position().top;
    var panelsHeight = $window.height() - $('div.footer').height() - offsetTopPanels;

    $textarea.height( panelsHeight - 100);

    $dotNotation.typeahead({
        source : dotNotationDisplayArray,
        items  : 8
    });

    // Hide remove image button
    $('#removeThumbnailButton').hide();
    $('#thumbnailImage').hide();

    $('#addThumbnailButton').addClass('disabled');

    // Adding some global vars for file validation
    fileHasErrors = false;
    fileErrors = [];

    $createdOn.val('');

    $window.resize(function() {
        var panelsHeight = $window.height() - $('div.footer').height() - offsetTopPanels;
        $textarea.height( panelsHeight - 100);
    });

    loadDrafts();
    loadHistory();
});
