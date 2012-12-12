
function readAlignmentDataFromFiles() {
    $.ajax({
        type: "GET",
        url: "/ccss2asn-math.csv",
        dataType: "text",
        success: function(data) {
            processDataForAlignmentArray(data);
        }
    });
    $.ajax({
        type: "GET",
        url: "ccss2asn-ela.csv",
        dataType: "text",
        success: function(data) {
            processDataForAlignmentArray(data);
        }
    });
}
