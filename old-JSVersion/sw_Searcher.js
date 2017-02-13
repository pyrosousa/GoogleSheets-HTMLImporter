$('#nosw').hide();

$( document ).ready(function() {
	$('#swload1').remove();
	$('#swload2').remove();
	$('#swload3').remove();

	
	var $rows = $('#swlist tr');
	$('#search').keyup(function() {
		var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
		reg = RegExp(val, 'i'),
		text;
		$rows.show().filter(function() {
			text = $(this).text().replace(/\s+/g, ' ');
			return !reg.test(text);
		}).hide();
	
	var numTR = $('#swlist').find('tr').length;
	var numHide = $('#swlist').find('tr:hidden').length;
	
	if (numTR === numHide) {
		console.log("all cells hidden");
		$('#nosw').show();
	} else {
		console.log("some cells are visible");
		$('#nosw').hide();
	}
	//console.log("Number of rows: " + numTR + "Number of Hidden: " + numHide);
	
	
	});
	
	
	
});