$(function() {

    $("#description").change(function(e){
        blankCurrentAlignment();
        document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
        document.getElementById('addButton').setAttribute("class","btn btn-success");
    });

});