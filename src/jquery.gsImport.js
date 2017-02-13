;(function($) {
	$.fn.gsImport = function( options ) {
		var settings = $.extend({
            cellClass: 'gsCell',
            rowClass: 'gsRow',
            headerClass: 'gsHeader',
            headerRowClass: 'gsHeaderRow',
            tableClass: 'gsTable table table-responsive table-striped',
            image1: '<i class="fa fa-check"></i>',
            image2: '<i class="fa fa-times"></i>',
            ignore: '',

        }, options );


        return this.append(function gsImporter() {
		var $me = $(this),
			headers = $me.data("headers"),
			key = $me.data('key'),
			index = $me.data('index')

		var url = "https://spreadsheets.google.com/feeds/list/" + key + "/1/public/values?alt=json";
		var headerList = headers.split(', ');

		function picturize(nStr) {
				switch (nStr)
				{
					case "":
						return '-';
						break;
					case "!":
						return '<i class="fa fa-check"></i>';
						break;
					case "X":
						return '<i class="fa fa-times"></i>';
						break;
					default:
						return nStr;
						break;
				}
			}

		$.getJSON(url, function(data) {
			var entry = data.feed.entry;
			console.log($me)
			$($me).append('<table class="' + settings.tableClass + '"><thead></thead><tbody></tbody></table>')

			$(headerList).each(function(){ // Adds headers
				$($me).find(' table thead').append('<th class="' + settings.headerClass + '">' + this.toString()+"</th>")
			})
			$($me).find(' table thead th').wrapAll('<tr class="' + settings.headerRowClass + '"></tr>')

			$(entry).each(function(){
				var $curCell = this;
					$(headerList).each(function () {
							$($me).find(' table tbody').append('<td class="' + settings.cellClass + '">' + picturize(eval('$curCell.gsx$'+this.toString().toLowerCase()+'.$t')) + '</td>')
				})
			});

			var i = 0,
			    cells = $($me).find(' table tbody td'),
			    group;

			while ((group = cells.slice(i, i += headerList.length)).length) {
			    group.wrapAll('<tr class="' + settings.rowClass + '"></tr>');
			}

		});
	});
	}
}(jQuery))
