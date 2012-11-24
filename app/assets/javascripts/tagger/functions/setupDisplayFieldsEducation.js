// Take the comma separated list for {field} from {item}.{field} and populate the select#{field} box
// Any of the values in the comma separated list for {field} that doesn't have an option in select#{field}
// Get stuffed into {field}Other as it's own comma separated list.
function setupDisplayFieldsEducationTab(item, field) {
    if (item[field] != '' && $('select#'+field)[0] != undefined) {
        var itemOptions = item[field].split(',');
        $('select#'+field+' option').each(function() {
            if ($.inArray($(this).val(),itemOptions) !== -1) {
                $(this).attr('selected',true);
            }
        });
        var selectOptions = $('select#'+field+' option').map(function() { return this.value });
        var otherOptions = [];
        for (i in itemOptions) {
            if ($.inArray(itemOptions[i], selectOptions) === -1) {
                otherOptions.push(itemOptions[i]);
            }
        }
        if (otherOptions.length > 0) {
            $('#'+field+'Other').attr('value',otherOptions.join(','));
        }
    }
}
