$(function() {

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

    // Make two flyout panels resizable but not the iframe one
    $("#mainContentTopLeft" ).resizable({ handles: "e"});
    $("#mainContentTopRight" ).resizable({ handles: "e"});

    $.ajaxSetup({ cache: false });

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

    $mainContentTopLeft.height( panelsHeight );
    $mainContentTopRight.height( panelsHeight );
    $mainContentBottom.height( panelsHeight );
    $mainContentBottom.width( $window.width() - $mainContentTopLeft.width() - $mainContentTopRight.width() - 70 );
    $textarea.height( panelsHeight - 100);

    $dotNotation.typeahead({source: dotNotationDisplayArray, items:8});

    $createdOn.val('');

    $window.resize(function() {
        $mainContentTopLeft.height( panelsHeight );
        $mainContentTopRight.height( panelsHeight );
        $mainContentBottom.height( panelsHeight );
        $mainContentBottom.width( $window.width() - $mainContentTopLeft.width() - $mainContentTopRight.width() - 70 );
        $textarea.height( panelsHeight - 100);
    });

    // checkCookie();

    // # TODO Load this after user auths, not before. But for now this works.
    loadDrafts();
});
