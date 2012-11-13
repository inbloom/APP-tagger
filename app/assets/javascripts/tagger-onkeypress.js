$("#description").keypress(function(e){
    blankCurrentAlignment();
    document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
    document.getElementById('addButton').setAttribute("class","btn btn-success");
});

$("#dotNotation").keypress(function(e){
    blankCurrentAlignment();
    document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
    document.getElementById('addButton').setAttribute("class","btn btn-success");
});

$("#itemURL").keypress(function(e){
    blankCurrentAlignment();
    document.getElementById('deleteButton').setAttribute("class","btn btn-warning disabled");
    document.getElementById('addButton').setAttribute("class","btn btn-success");
});

