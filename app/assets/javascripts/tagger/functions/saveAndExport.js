
function saveLocal(str, fileType){
    var date = new Date();
    var form_action = location.protocol + '//' + location.host + "/tagger/save_local/";
    $('<form></form>', { action: form_action, method: 'POST'}).append(
      $('<input></input>', { name: 'filename', type: 'hidden', value: firstName + lastName + "_" + ISODateString(date)+ fileType })
    ).append(
			$('<input></input>', { name: 'data', type: 'hidden', value: str })
    ).submit();
}

function saveServer(str){
    $('<form></form>', { action: 'http://23.23.213.206:81/index.php', method: 'POST'}).append(
        $('<input></input>', { name: 'content', type: 'hidden', value: str })
    ).submit();
}
