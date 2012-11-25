
function saveLocal(str, fileType){
    var date = new Date();
    var form_action = location.protocol + '//' + location.host + "/tagger/save_local/";
    $('<form></form>', { action: form_action, method: 'POST'}).append(
      $('<input></input>', { name: 'filename', type: 'hidden', value: fileType + "_" + ISODateString(date)+ fileType })
    ).append(
			$('<input></input>', { name: 'data', type: 'hidden', value: str })
    ).submit();
}

function saveServer(str){
		var form_action = location.protocol + '//' + location.host + "/tagger/save_lri/";
    $('<form></form>', { action: form_action, method: 'POST'}).append(
        $('<input></input>', { name: 'content', type: 'hidden', value: str })
    ).submit();
}
