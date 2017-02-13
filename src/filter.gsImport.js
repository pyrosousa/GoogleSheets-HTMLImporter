// check URL
// get  headers

// load json
// parse json
// 	append table headers
// 	append table columns
// 		ignore rows marked with settings.ignore
// 		append icons for cells
// 			default icon
// 			special icon for defined with settings.icon
// 			return string

$(document).ready(function () {

	$("#gsImport").append(function gsImporter() {
		var $me = $(this),
			headers = $me.data("headers"),
			key = $me.data('key'),
			index = $me.data('index')

		var url = "https://spreadsheets.google.com/feeds/list/" + key + "/1/public/values?alt=json";
		var headerList = headers.split(', ');

		$.getJSON(url, function(data) {
			var entry = data.feed.entry;

			$('.results').append('<table><tbody></tbody></table>')

			$(headerList).each(function(){ // Adds headers
				$('.results table tbody').append('<th>' + this.toString()+"</th>")
			})
			$('.results table tbody th').wrapAll('<tr class="table-headers"></tr>')

			$(entry).each(function(){
				var $curCell = this;
					$(headerList).each(function () {
							$('.results table tbody').append("<td>" + eval('$curCell.gsx$'+this.toString().toLowerCase()+'.$t') + "</td>")
				})
			});

			var i = 0,
			    cells = $(".results table tbody td"),
			    group;

			while ((group = cells.slice(i, i += headerList.length)).length) {
			    group.wrapAll('<tr class="table-row"></tr>');
			}

		});
	});
});
