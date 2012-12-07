function validateAlignmentForm() {

  default_values = new Array;

  $(".required").each( function (k,v) { default_values[k] = v.value } );

  req_all = default_values.length

  filled_out_values = $.grep(default_values,function(n){ return(n) });

  filled_out_values = $.grep(filled_out_values, function(value) {
    return value != 'Alignment Type...';
  });

  filled_out_values = $.grep(filled_out_values, function(value) {
    return value != 'Loading (please wait)....';
  });

  req_filled = filled_out_values.length

  if ((req_filled > 0) && (req_all == req_filled)) {
    $("#addButton").removeAttr("disabled");
  } else {
    $("#addButton").attr("disabled", "disabled");
  }

}