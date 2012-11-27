function processJSONOutput(checked){
    if (checked == undefined) {
        return JSON.stringify(items);
    } else {
        var checked_items = {};
        $("#multiItemSelector input[type=checkbox]:checked").each(function(i,obj) {
            checked_items[obj.id] = items[obj.id]
        });
        return JSON.stringify(checked_items);
    }
}