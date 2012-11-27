function toggleForm() {
    if ($("#multiItemSelector input[type=checkbox]:checked").length > 0) {
        $("#LRMIData input,#LRMIData select").removeAttr("disabled");
        $("#educationTab,#alignmentTab").removeClass("disabled");
        $("#educationTab a,#alignmentTab a").attr('data-toggle', 'tab');
    } else {
        $("#LRMIData input,#LRMIData select").attr("disabled","disabled");
        $("#educationTab,#alignmentTab").addClass("disabled");
        $("#educationTab a,#alignmentTab a").removeAttr("data-toggle");
    }
}