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

    $textarea.height( panelsHeight - 100);

    $dotNotation.typeahead({source: dotNotationDisplayArray, items:8});

    $createdOn.val('');

    $window.resize(function() {
        var panelsHeight = $window.height() - $('div.footer').height() - offsetTopPanels;
        $textarea.height( panelsHeight - 100);
    });

    // checkCookie();

    loadDrafts();
    loadHistory();
});
