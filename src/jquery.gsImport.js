//features to add:
//		search-bar
//		custom-Image Cases
//		Ignore row if ...

;(function($) {
	$.fn.gsImport = function( options ) {

		var defaults = {
            cellClass: 'gsCell',
            rowClass: 'gsRow',
            headerClass: 'gsHeader',
            headerRowClass: 'gsHeaderRow',
            bodyClass: 'gsBody',
            tableClass: 'gsTable table table-responsive table-striped',
            image1: '<i class="fa fa-check"></i>',
            image2: '<i class="fa fa-times"></i>',
            customImages: '',
            ignore: '',
        }

		var settings = $.extend(defaults, options );

        return this.append(function gsImporter() {
		var $me = $(this),
			headers = $me.data("headers"),
			key = $me.data('key'),
			index = $me.data('index')

		if (typeof key === 'undefined') {
		    console.error('GSImport: No data-key provided for div: ' + $me.attr('id'))
		    return;
		}

		if (typeof headers === 'undefined') {
		    console.error('GSImport: No data-headers provided for div: ' + $me.attr('id'))
		    return;
		}

		if (typeof index === 'undefined') {
		    console.warn('GSImport: No data-index provided for div: ' + $me.attr('id') + '\nDefaulting to od6')
		    index = "od6"
		}

		var url = "https://spreadsheets.google.com/feeds/list/" + key + "/1/public/values?alt=json";
		var headerList = headers.split(', ');

		function picturize(nStr) {
				switch (nStr)
				{
					case "":
						return '-';
						break;
					case "!":
						return settings.image1;
						break;
					case "X":
						return settings.image2;
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

			$.each(headerList, function(){ // Adds headers
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
