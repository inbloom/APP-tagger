$(function() {

    $(".add-alignment").click(function(obj) {

        $('#alignmentsModal').modal('show');

        return false;
    })
    document.onkeypress = function (e) { if(e.which == 13) { return false; } }
});