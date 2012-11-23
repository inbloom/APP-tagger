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

    window.alignmentArray = new Array();
    window.dotNotationDisplayArray = new Array();
    window.currentAlignmentArray = new Array();

    var offsetTopPanels = 80;

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

    $mainContentTopLeft.height( $window.height() - offsetTopPanels);
    $mainContentTopRight.height( $window.height() - offsetTopPanels);
    $mainContentBottom.height( $window.height() - offsetTopPanels);

    $mainContentBottom.width( $window.width() - $mainContentTopLeft.width() - $mainContentTopRight.width() - 50 );

    $textarea.height( $window.height() - 160);

    $dotNotation.typeahead({source: dotNotationDisplayArray, items:8});

    $createdOn.val('');

    $window.resize(function() {
        $mainContentTopLeft.height( $window.height() - offsetTopPanels);
        $mainContentTopRight.height( $window.height() - offsetTopPanels);
        $mainContentBottom.height( $window.height() - offsetTopPanels);
        $mainContentBottom.width( $window.width() - $mainContentTopLeft.width() - $mainContentTopRight.width() - 50 );

        $textarea.height( $window.height() - 160);
    });

    checkCookie();
});
